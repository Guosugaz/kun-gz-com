const path = require("path");
import { markdownConfig } from "./plugins/code-plugin";
import guide from "./utils/guide.js";
import common from "./utils/common";

module.exports = {
  base: "/kun-gz-com/dist/",
  // dest: path.resolve(__dirname, "../../dist"),
  title: "Gz-UI",
  // description: "封装平时搭建的通用组件",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    config: markdownConfig
  },
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  themeConfig: {
    logo: "/logo.gif",
    sidebarDepth: 0,
    siteTitle: "Gz-UI",
    aside: false,
    nav: [
      { text: "开发指南", link: "/guide/start" },
      { text: "组件使用", link: "/examples/Group/" }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/aiai0603" }],
    sidebar: {
      "/guide/": guide,
      "/examples/": [common]
    },
    // sidebar: [
    //   ["/", "快速上手"],
    //   // ["/AsyncMessageBox/", "AsyncMessageBox"],
    //   // ["/Dialog/", "Dialog"],
    //   ["/Group/", "Group"],
    //   // ["/DatePickerRange/", "DatePickerRange"],
    //   // ["/Table/", "Table"],
    // ],
    // nav: [
    //   { text: 'Github', link: 'https://github.com/Guosugaz/kun-el-com', target:'_blank' }
    // ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    }
  }
};
