import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Today",
            meta: { layout: "default" }, // Sử dụng layout "default"
            component: () => import("../views/TodayView.vue"),
        },
        {
            path: "/calendar",
            name: "Calendar",
            meta: { layout: "default" }, // Sử dụng layout "default"
            component: () => import("../views/CalendarView.vue"),
        },
        {
            path: "/register",
            name: "Register",
            meta: { layout: "auth" },
            component: () => import("../views/RegisterView.vue"),
        },
        {
            path: "/login",
            name: "Login",
            meta: { layout: "auth" },
            component: () => import("../views/LoginView.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
        next("/login");
    } else {
        next();
    }
});

export default router;
