import Element from "element-ui";
import Mock from "mockjs";
import KunElCom from "../../lib/index";
import "element-ui/lib/theme-chalk/index.css";
import "../../lib/theme-default/index.css";

export default ({ Vue }) => {
  Vue.prototype.$Mock = Mock;
  Vue.use(Element);
  Vue.use(KunElCom);
};
