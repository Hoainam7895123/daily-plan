<template>
    <div class="w-full h-full">
        <!-- Phần Header (H1 và Buttons) -->
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-6xl font-semibold mb-6">{{ currentDate }}</h1>
            <button class="px-4 py-2 bg-gray-100 border rounded-md">
                Add Event
            </button>
        </div>

        <div class="flex space-x-2 mb-4">
            <button
                class="px-4 py-2 border rounded-md bg-gray-200"
                @click="viewMode = 'day'"
            >
                Day
            </button>
            <button
                class="px-4 py-2 border rounded-md"
                @click="viewMode = 'week'"
            >
                Week
            </button>
            <button
                class="px-4 py-2 border rounded-md"
                @click="viewMode = 'month'"
            >
                Month
            </button>
        </div>

        <!-- Phần lịch có thể cuộn (relative) -->
        <div class="relative h-[calc(100vh-200px)] overflow-y-auto">
            <div class="absolute top-0 left-0 w-20">
                <div
                    v-for="time in timeSlots"
                    :key="time"
                    class="flex flex-col pb-20 border-t-2 border-gray-300"
                >
                    <span>
                        {{ time }}
                    </span>
                </div>
            </div>

            <div>
                <div
                    v-for="event in events"
                    :key="event.id"
                    class="absolute w-full p-4 rounded-lg"
                    :class="event.bgColor"
                    :style="{ top: event.position, height: event.duration }"
                >
                    <span class="font-medium">{{ event.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: "16 February 2022",
            viewMode: "day",
            timeSlots: [
                "00:00 AM",
                "01:00 AM",
                "02:00 AM",
                "03:00 AM",
                "04:00 AM",
                "05:00 AM",
                "06:00 AM",
                "07:00 AM",
                "08:00 AM",
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "01:00 PM",
                "02:00 PM",
                "03:00 PM",
                "04:00 PM",
                "05:00 PM",
                "06:00 PM",
                "07:00 PM",
                "08:00 PM",
                "09:00 PM",
                "10:00 PM",
                "11:00 PM",
                "12:00 AM",
            ],
            events: [
                {
                    id: 1,
                    name: "Session 1: Marketing Sprint",
                    bgColor: "bg-blue-100",
                    position: "16px",
                    duration: "60px",
                },
                {
                    id: 2,
                    name: "Sales Catchup",
                    bgColor: "bg-blue-200",
                    position: "92px",
                    duration: "60px",
                },
                {
                    id: 3,
                    name: "Renew driver's license",
                    bgColor: "bg-red-100",
                    position: "168px",
                    duration: "60px",
                },
            ],
        };
    },
};
</script>
