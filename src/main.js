import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

import { Auth0Plugin } from "./auth";

import { domain, clientId, audience } from "../auth_config.json";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});
Vue.config.productionTip = false;

Vue.filter("roundPercentage", function(value) {
  if (!value) return "0%";
  value = value * 100;
  value = value.toFixed(2).toString();
  return value + "%";
});

axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.baseURL = "https://bakend-toxic-chat.herokuapp.com/";

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
