import Element from "element-ui";
import KunElCom from "../../lib/index";
import "element-ui/lib/theme-chalk/index.css";
import "../../lib/theme-default/index.css";

export default ({ Vue }) => {
  Vue.use(Element);
  Vue.use(KunElCom);
};
