// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootsrap.bundle.min.js";

const app = createApp(App);

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
};

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);
app.mount("#app");
