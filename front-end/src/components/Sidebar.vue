<template>
    <div class="h-full w-[350px] bg-[#f4f4f4] text-dark rounded-2xl">
        <div class="p-4 flex flex-col h-full">
            <div class="row flex items-center justify-between mb-5">
                <h1 class="text-3xl font-bold">Menu</h1>
                <font-awesome-icon class="text-2xl" icon="bars" />
            </div>
            <div class="row mb-6">
                <input
                    type="text"
                    class="w-full p-3 rounded-md bg-[#f4f4f4] text-dark border border-[#d3d3d3]"
                    placeholder="Search"
                />
            </div>
            <div class="row mb-6">
                <p class="text-sm mb-3 text-[#444444ff]">TASKS</p>
                <ul>
                    <li
                        class="flex items-center space-x-2 w-full h-11"
                        v-for="option in TASKS_OPTION"
                        :key="option.name"
                    >
                        <router-link
                            class="flex items-center space-x-2 h-full w-full"
                            :to="option.route"
                            active-class="bg-[#EBEBEB] rounded-md text-dark font-bold"
                            exact-active-class="bg-[#EBEBEB] rounded-md text-dark font-bold"
                        >
                            <font-awesome-icon
                                class="w-6 h-6 text-[#7C7C7C] px-3"
                                :icon="option.icon"
                            />
                            <span class="text-[#444444]">{{
                                option.name
                            }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="row mb-6">
                <p class="text-sm mb-3 text-[#444444ff]">LISTS</p>
                <ul>
                    <li class="flex items-center space-x-2 w-full h-11">
                        <span class="w-6 h-6 bg-red-500 rounded mx-3"></span>
                        <span class="text-[#444444ff]">Personal</span>
                    </li>
                    <li class="flex items-center space-x-2 w-full h-11">
                        <span class="w-6 h-6 bg-blue-500 rounded mx-3"></span>
                        <span class="text-[#444444ff]">Work</span>
                    </li>
                    <li class="flex items-center space-x-2 w-full h-11">
                        <span class="w-6 h-6 bg-yellow-300 rounded mx-3"></span>
                        <span class="text-[#444444ff]">List 1</span>
                    </li>
                </ul>
            </div>
            <div class="row mb-6 mt-auto">
                <p class="text-sm mb-3 text-[#444444ff]">LISTS</p>
                <ul>
                    <li class="flex items-center space-x-2 w-full h-11">
                        <font-awesome-icon
                            class="w-6 h-6 text-[#7C7C7C] px-3"
                            icon="sliders"
                        />
                        <span class="text-[#444444ff]">Personal</span>
                    </li>
                    <li class="flex items-center space-x-2 w-full h-11">
                        <font-awesome-icon
                            class="w-6 h-6 text-[#7C7C7C] px-3"
                            icon="right-from-bracket"
                        />
                        <span class="text-[#444444ff]">Work</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { TASKS_OPTION } from "@/constant";

export default {
    setup() {
        return { TASKS_OPTION };
    },
};
</script>
