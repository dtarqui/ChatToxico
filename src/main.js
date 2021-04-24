import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.baseURL = "https://bakend-toxic-chat.herokuapp.com/";
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
