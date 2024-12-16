<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div
            class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
        >
            <h2 class="text-2xl font-bold text-center text-gray-700">
                Register
            </h2>

            <!-- Form register -->
            <form @submit.prevent="submitRegister">
                <div>
                    <label
                        for="firstName"
                        class="block text-sm font-medium text-gray-600"
                        >First Name</label
                    >
                    <input
                        type="text"
                        id="firstName"
                        v-model="firstName"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div>
                    <label
                        for="lastName"
                        class="block text-sm font-medium text-gray-600"
                        >Last Name</label
                    >
                    <input
                        type="text"
                        id="lastName"
                        v-model="lastName"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-600"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
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
                <div>
                    <label
                        for="matchingPassword"
                        class="block text-sm font-medium text-gray-600"
                        >Confirm Password</label
                    >
                    <input
                        type="password"
                        id="matchingPassword"
                        v-model="matchingPassword"
                        class="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="w-full py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Register
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Already have an account?
                <a href="/login" class="text-blue-500 hover:underline">Login</a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            matchingPassword: "",
        };
    },
    methods: {
        submitRegister() {
            if (this.password !== this.matchingPassword) {
                alert("Passwords do not match!");
                return;
            }
            // Your registration logic here
            console.log("First Name:", this.firstName);
            console.log("Last Name:", this.lastName);
            console.log("Email:", this.email);
            console.log("Password:", this.password);
        },
    },
};
</script>
