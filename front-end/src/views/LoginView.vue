<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div
            class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
        >
            <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>

            <!-- Form login -->
            <form @submit.prevent="submitLogin">
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-600"
                        >Username</label
                    >
                    <input
                        type="text"
                        id="email"
                        v-model="username"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="mt-4">
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-600"
                        >Password</label
                    >
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="w-full py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Don't have an account?
                <a href="/register" class="text-blue-500 hover:underline"
                    >Register</a
                >
            </p>
        </div>
    </div>
</template>

<script>
import { login } from "../api/auth";

export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },

    methods: {
        async submitLogin() {
            try {
                const response = await login(this.username, this.password);
                localStorage.setItem("token", response.accessToken);
                this.$router.push("/");
            } catch (error) {
                console.log("Đăng nhập thất bại:", error);
                alert("Login failed");
            }
        },
    },
};
</script>
