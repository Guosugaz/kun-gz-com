import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "prismjs/themes/prism-coy.min.css";
import CodeBox from "../components/CodeBox.vue";
import Element from "element-plus";
import GzCom from "../../../src/index";
import "../../../src/theme-default/index.scss";
import "element-plus/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(GzCom, { group: { labelWidth: "8em" } });
    app.use(Element);
    app.component("CodeBox", CodeBox);
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
};
