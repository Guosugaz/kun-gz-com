import type { App } from "vue";
import Dialog from "./index.vue";

Dialog.install = function (app: App) {
  app.component(Dialog.name, Dialog);
};

export default Dialog;
