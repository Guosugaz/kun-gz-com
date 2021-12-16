import AsyncMessageBox from "./async-message-box/index.js";

export default {
  install(Vue) {
    Vue.prototype.$ayConfirm = AsyncMessageBox.ayConfirm;
    Vue.prototype.$ayPrompt = AsyncMessageBox.ayPrompt;
  }
};
