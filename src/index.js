import AsyncMessageBox from "./async-message-box/index.js";
import Dialog from "./dialog/index";

export default {
  install(Vue) {
    Vue.use(AsyncMessageBox);
    Vue.use(Dialog);
  },
  AsyncMessageBox,
  Dialog
};
