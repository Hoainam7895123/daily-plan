import axios from "axios";

// Hàm lấy thông tin người dùng từ API
export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    // Kiểm tra token có tồn tại hay không
    if (!token) {
        console.error("Không tìm thấy token");
        return null;
    }

    try {
        // Gửi yêu cầu lấy thông tin người dùng
        const response = await axios.get(
            "http://localhost:3000/api/auth/current-user",
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Gửi token trong header
                },
            }
        );

        // Kiểm tra trạng thái phản hồi từ server
        if (response.status === 200) {
            return response.data; // Trả về thông tin người dùng nếu thành công
        } else {
            console.error(
                "Không thể lấy thông tin người dùng:",
                response.statusText
            );
            return null;
        }
    } catch (error) {
        // Xử lý lỗi khi gọi API
        if (error.response) {
            // Lỗi do server trả về
            console.error("Lỗi từ server:", error.response.data);
        } else if (error.request) {
            // Lỗi khi không nhận được phản hồi từ server
            console.error("Không nhận được phản hồi từ server:", error.request);
        } else {
            // Lỗi cấu hình hoặc lỗi không xác định
            console.error("Lỗi khi thực hiện yêu cầu:", error.message);
        }
        return null;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
                username,
                password,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
