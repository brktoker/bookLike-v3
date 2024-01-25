import "@/assets/style.css";
import BookmarkList from "@/components/BookmarkItems/Index.vue";
//components
import AppHeader from "@/components/Shared/AppHeader.vue";
import { appAxios } from "@/utils/appAxios";
import { socketio } from "@/utils/socketio";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.component("AppHeader", AppHeader);
app.component("BookmarkList", BookmarkList);

app.config.globalProperties.$axios = appAxios;
app.config.globalProperties.$socket = socketio;

app.provide("appAxios", appAxios);
app.provide("socketio", socketio);

app.use(router);
app.use(store);
app.mount("#app");
