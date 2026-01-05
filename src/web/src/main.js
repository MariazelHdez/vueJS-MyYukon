import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import vuetify from "./plugins/vuetify";

axios.defaults.withCredentials = true;

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount("#app");
