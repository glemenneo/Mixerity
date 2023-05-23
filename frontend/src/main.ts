import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import store from "./store";
import router from "./router";

Vue.use(ElementUI);
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://192.168.2.197:3000/";

new Vue({
  store: store,
  router: router,
  render: (h) => h(App),
}).$mount("#app");
