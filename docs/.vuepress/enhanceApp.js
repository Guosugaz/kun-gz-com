import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { ayConfirm } from "../../lib/async-message-box/index";

export default ({ Vue }) => {
  Vue.use(ElementUI);
  Vue.prototype.$ayConfirm = ayConfirm;
};
