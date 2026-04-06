import { createApp } from "vue";
import "./main.scss";
import App from "./App.vue";

// 引入 Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// 引入 Bootstrap JS (選用，如果你需要下拉選單、彈窗等功能)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createApp(App).mount("#app");
