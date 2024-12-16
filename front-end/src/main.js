import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import FontAwesomeIcon from "./plugins/fontawesome";

import { registerGlobalComponent } from "./utils/import";

const app = createApp(App);

// Register global components
registerGlobalComponent(app);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
