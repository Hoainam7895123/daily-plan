import axios from "axios";

export const apiGetTodos = async (token) => {
    try {
        const response = await axios.get(
            "http://localhost:3000/api/todos/get",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiAddTodo = async (token, todo, userId) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/todos/add",
            {
                name: todo.name,
                description: todo.description,
                dueDate: todo.dueDate,
                status: false,
                userId: userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi ra ngoài
    }
};

export const apiUpdateTodo = async (token, todo) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/api/todos/update/${todo._id}`, // Chèn id vào URL
            {
                name: todo.name,
                description: todo.description,
                dueDate: todo.dueDate,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi ra ngoài
    }
};

export const apiDeleteTodo = async (token, todoId) => {
    const response = await axios.delete(
        `http://localhost:3000/api/todos/delete/${todoId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const apiUpdateTodoStatus = async (token, todoId, status) => {
    try {
        const url = status
            ? `http://localhost:3000/api/todos/complete/${todoId}`
            : `http://localhost:3000/api/todos/uncomplete/${todoId}`;

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái todo:", error);
    }
};
