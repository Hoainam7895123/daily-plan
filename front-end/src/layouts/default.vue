<template>
    <div class="flex h-screen p-6 overflow-hidden">
        <!-- Sidebar -->
        <Sidebar class="w-[350px]" />

        <!-- Main Content -->
        <div class="flex-1 ml-10">
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    mounted() {
        // Kiểm tra token trước khi hiển thị nội dung bảo mật
        const token = localStorage.getItem("token");
        if (!token) {
            this.$router.push("/login"); // Nếu không có token, chuyển hướng về trang đăng nhập
        }
    },
};
</script>
