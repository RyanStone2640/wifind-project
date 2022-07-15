import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import style from "./style/style.scss";


createApp(App).use(router).use(style).use(store).mount("#app");
