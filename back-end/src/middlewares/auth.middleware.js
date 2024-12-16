const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/api.response');
const UserRepository = require('../repositories/user.repository');

async function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = data;
            next(); // Cho phép đi tiếp đến middleware hoặc handler tiếp theo
        });
    } catch (error) {
        console.error('Error during token verification:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function checkAndRefreshToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json(ApiResponse.errorResponse('Authorization header is missing'));
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json(ApiResponse.errorResponse('Access token is missing'));
    }

    try {
        // Kiểm tra access token
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Nếu token hết hạn, kiểm tra refresh token
                    const refreshToken = req.body.token || req.headers['x-refresh-token'];

                    if (!refreshToken) {
                        return res.status(403).json(ApiResponse.errorResponse('Refresh token is missing'));
                    }

                    // Kiểm tra refresh token trong cơ sở dữ liệu
                    const user = await UserRepository.findByRefreshToken(refreshToken);
                    if (!user) {
                        return res.status(403).json(ApiResponse.errorResponse('Invalid refresh token'));
                    }

                    // Nếu refresh token hợp lệ, tạo lại access token mới
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                        if (err) {
                            return res.status(403).json(ApiResponse.errorResponse('Invalid refresh token'));
                        }

                        const newAccessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '60s',
                        });

                        // Thêm access token mới vào header hoặc response
                        res.setHeader('Authorization', 'Bearer ' + newAccessToken);

                        // Lưu thông tin người dùng vào request
                        req.user = data;

                        // Tiếp tục với middleware hoặc handler tiếp theo
                        next();
                    });
                } else {
                    // Nếu lỗi không phải do hết hạn, token không hợp lệ
                    return res.status(403).json(ApiResponse.errorResponse('Invalid access token'));
                }
            } else {
                // Nếu access token hợp lệ, tiếp tục
                req.user = data;
                next();
            }
        });
    } catch (error) {
        console.error('Error in checking and refreshing token:', error);
        return res.status(500).json(ApiResponse.errorResponse('Internal server error'));
    }
}

module.exports = { authenToken, checkAndRefreshToken };
