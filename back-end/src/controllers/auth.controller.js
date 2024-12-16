const jwt = require('jsonwebtoken');

const ApiResponse = require('../utils/api.response');
const UserRepository = require('../repositories/user.repository');

class AuthController {
    constructor() {
        this.repository = new UserRepository();
        console.log('UserRepository initialized:', this.repository);
    }

    login = async (req, res) => {
        try {
            const data = req.body;
            const user = await this.repository.findByUsername(data.username);

            if (!user) return res.status(401).json({ message: 'User not found' });
            if (user.password !== data.password) return res.status(401).json({ message: 'Password is incorrect' });

            const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h',
            });
            const refreshToken = jwt.sign({ username: data.username }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1h',
            });

            user.refreshToken = refreshToken;
            await user.save();

            res.json({ accessToken, refreshToken });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    refreshToken = async (req, res) => {
        try {
            const refreshToken = req.body.token;

            if (!refreshToken || refreshToken.trim() === '') {
                return res.status(401).json(ApiResponse.errorResponse('Refresh token is required'));
            }

            const user = await this.repository.findByRefreshToken(refreshToken);
            if (!user) return res.status(403).json(ApiResponse.errorResponse('Invalid refresh token'));

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                console.error('JWT Verification Error:', err);
                if (err) return res.status(403).json(ApiResponse.errorResponse('Invalid refresh token'));

                const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '30s',
                });

                res.json({ accessToken });
            });
        } catch (error) {
            console.error('Error during refresh token:', error);
            res.status(500).json(ApiResponse.errorResponse('Internal server error'));
        }
    };

    logout = async (req, res) => {
        try {
            const refreshToken = req.body.token;

            if (!refreshToken || refreshToken.trim() === '') {
                return res.status(401).json(ApiResponse.errorResponse('Refresh token is required'));
            }
            const user = await this.repository.findByRefreshToken(refreshToken);
            if (!user) return res.status(403).json(ApiResponse.errorResponse('Invalid refresh token'));

            user.refreshToken = null;
            await user.save();

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getCurrentUser = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json(ApiResponse.errorResponse('Access token is required'));
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json(ApiResponse.errorResponse('Invalid token format'));
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(403).json(ApiResponse.errorResponse('Invalid or expired token'));
                }

                const user = await this.repository.findByUsername(decoded.username);
                if (!user) {
                    return res.status(404).json(ApiResponse.errorResponse('User not found'));
                }

                res.status(200).json({
                    username: user.username,
                    id: user._id,
                });
            });
        } catch (error) {
            console.error('Error in getCurrentUser:', error);
            res.status(500).json(ApiResponse.errorResponse('Internal server error'));
        }
    };
}

module.exports = AuthController;
