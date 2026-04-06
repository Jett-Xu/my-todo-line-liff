import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./main.scss";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 設定預設深色模式 (Bootstrap 5.3 feature)
document.documentElement.setAttribute('data-bs-theme', 'dark');

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
