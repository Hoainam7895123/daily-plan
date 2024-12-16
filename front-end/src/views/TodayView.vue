<template>
    <div class="w-full flex h-full">
        <div
            :class="[
                'transition-all duration-300',
                isAddingTodo ? 'w-1/2' : 'w-full',
                'flex-grow overflow-auto',
            ]"
        >
            <h1 class="text-6xl font-semibold mb-6">Today</h1>

            <button
                @click="toggleAddTodo"
                class="w-full flex items-center p-4 rounded-lg border border-gray-300"
            >
                <font-awesome-icon class="mr-4" icon="plus" />
                Add Task
            </button>
            <ul>
                <li
                    class="text-[#444444ff]"
                    v-for="(todo, index) in filteredTodos"
                    :key="todo._id"
                >
                    <div
                        class="flex items-center p-4 border-b-2 border-[#f4f4f4]"
                    >
                        <!-- Checkbox before todo -->
                        <input
                            type="checkbox"
                            v-model="todo.status"
                            :id="'todo-' + index"
                            @change="updateTodoStatus(todo._id, todo.status)"
                            class="w-5 h-5 border-gray-300 mr-4"
                        />
                        <span
                            @click="changeTodo(todo)"
                            class="cursor-pointer"
                            >{{ todo.name }}</span
                        >
                        <button @click="deleteTodo(todo._id)" class="ml-auto">
                            <font-awesome-icon
                                class="ml-auto text-red-500"
                                icon="trash"
                            />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div
            v-if="isAddingTodo"
            class="ml-6 p-4 bg-[#f4f4f4] rounded-lg w-1/2 flex flex-col"
        >
            <h1 class="text-2xl font-semibold mb-6">Task:</h1>

            <input
                type="text"
                v-model="currentTodo.name"
                class="w-full p-3 rounded-md bg-[#f4f4f4] text-dark border border-[#d3d3d3]"
                placeholder="Enter your todo"
            />
            <textarea
                type=""
                v-model="currentTodo.description"
                class="w-full p-3 rounded-md bg-[#f4f4f4] text-dark border border-[#d3d3d3] mt-4"
                placeholder="Enter your todo"
            />
            <div class="mt-4 w-full flex items-center">
                <label for="tasks" class="min-w-[100px]">
                    <span>List</span>
                </label>
                <select
                    class="bg-[#f4f4f4] text-dark border border-[#d3d3d3] rounded-md min-w-[100px] px-2 py-1 appearance-none"
                    v-model="selectedTask"
                    id="tasks"
                >
                    <option value="task1">Task 1</option>
                    <option value="task2">Task 2</option>
                    <option value="task3">Task 3</option>
                </select>
            </div>

            <div class="mt-4 w-full flex items-center">
                <label for="tasks" class="min-w-[100px]">Due Date</label>
                <input
                    type="date"
                    v-model="currentTodo.dueDate"
                    class="px-2 py-1 rounded-md bg-[#f4f4f4] text-dark border border-[#d3d3d3]"
                    placeholder="Enter your todo"
                />
            </div>
            <div class="w-full flex items-center mt-auto">
                <button
                    @click="updateTodo"
                    class="mt-2 p-2 bg-blue-500 text-white rounded-md w-full mr-2"
                >
                    Update Todo
                </button>
                <button
                    @click="addTodo"
                    class="mt-2 p-2 bg-blue-500 text-white rounded-md w-full"
                >
                    Add Todo
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
    apiGetTodos,
    apiUpdateTodo,
    apiAddTodo,
    apiDeleteTodo,
    apiUpdateTodoStatus,
} from "../api/todos";
import { getCurrentUser } from "../api/auth";

export default {
    setup() {
        let currentUser = null;
        getCurrentUser()
            .then((user) => {
                currentUser = user;
                console.log("user", currentUser);
            })
            .catch((error) => {
                console.error("Error getting user:", error);
            });
        const todos = ref([]); // Mảng todos reactive

        const currentTodo = ref({
            _id: "",
            name: "",
            description: "",
            dueDate: "",
        });

        const isAddingTodo = ref(false);
        const isEditing = ref(false);

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token không tồn tại. Hãy đăng nhập trước!");
            return;
        }

        // Toggle form thêm/sửa
        const toggleAddTodo = () => {
            isAddingTodo.value = !isAddingTodo.value;
            if (!isAddingTodo.value) resetTodoForm();
        };

        const resetTodoForm = () => {
            currentTodo.value = {
                _id: "",
                name: "",
                description: "",
                dueDate: "",
            };
            isEditing.value = false;
        };

        // Chỉnh sửa todo
        const changeTodo = (todo) => {
            isEditing.value = true;
            toggleAddTodo();

            const date = new Date(todo.dueDate);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();

            currentTodo.value = {
                _id: todo._id,
                name: todo.name,
                description: todo.description,
                dueDate: `${year}-${month}-${day}`,
            };
        };

        const fetchTodos = async () => {
            try {
                const data = await apiGetTodos(token);
                todos.value = data;
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        const updateTodo = async () => {
            try {
                const updatedTodo = await apiUpdateTodo(
                    token,
                    currentTodo.value
                );

                console.log("Todo sau khi cập nhật:", updatedTodo);

                // Tạo mảng mới và gán lại cho todos.value
                const newTodos = todos.value.map((todo) =>
                    todo._id === updatedTodo._id ? updatedTodo : todo
                );

                todos.value = [...newTodos]; // Gán lại mảng mới để đảm bảo reactivity

                resetTodoForm();
                toggleAddTodo();
                isEditing.value = false;
            } catch (error) {
                console.error("Lỗi khi cập nhật todo:", error);
            }
        };

        const addTodo = async () => {
            try {
                console.log(currentTodo.value);
                const newTodo = await apiAddTodo(
                    token,
                    currentTodo.value,
                    currentUser.id
                );

                todos.value.push(newTodo);

                resetTodoForm();
                toggleAddTodo();
                isEditing.value = false;
            } catch (error) {
                console.error("Lỗi khi thêm todo:", error);
            }
        };

        const deleteTodo = async (todoId) => {
            try {
                await apiDeleteTodo(token, todoId);
                todos.value = todos.value.filter((todo) => todo._id !== todoId);
            } catch (error) {
                console.error("Lỗi khi xóa todo:", error);
            }
        };

        const updateTodoStatus = async (todoId, status) => {
            try {
                await apiUpdateTodoStatus(token, todoId, status);
                fetchTodos();
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái todo:", error);
            }
        };

        const filteredTodos = computed(() => {
            return todos.value;
        });

        onMounted(() => {
            fetchTodos();
        });

        return {
            todos,
            currentTodo,
            isAddingTodo,
            toggleAddTodo,
            changeTodo,
            updateTodo,
            addTodo,
            deleteTodo,
            updateTodoStatus,
            filteredTodos,
        };
    },
};
</script>
