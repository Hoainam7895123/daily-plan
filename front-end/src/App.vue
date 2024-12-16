<template>
    <component :is="layout">
        <RouterView />
    </component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { PUBLIC_LAYOUT } from "@/constant";

export default {
    setup() {
        const route = useRoute();

        const layout = computed(() => {
            return (route.meta.layout || PUBLIC_LAYOUT) + "-layout";
        });

        return {
            layout,
        };
    },
};
</script>
