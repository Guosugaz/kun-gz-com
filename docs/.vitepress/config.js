import { markdownConfig } from "./plugins/code-plugin";
import guide from "./utils/guide.js";
import common from "./utils/common";
import path from "path";
const cwd = String.raw`${process.cwd()}`.replace(/\\/g, "/");
import vueJsx from "@vitejs/plugin-vue-jsx";

export default {
  base: "/kun-gz-com/dist/",
  outDir: "../dist",
  // dest: path.resolve(__dirname, "../../dist"),
  title: "Gz-UI",
  // description: "封装平时搭建的通用组件",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    config: markdownConfig
  },
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  vite: {
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(cwd, "src") },
        {
          find: "@core",
          replacement: path.resolve(cwd, "core")
        }
      ]
    },
    plugins: [
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      })
    ]
  },
  themeConfig: {
    logo: "/logo.gif",
    sidebarDepth: 0,
    siteTitle: "Gz-UI",
    aside: false,
    nav: [
      { text: "开发指南", link: "/guide/start" },
      { text: "组件使用", link: "/examples/Group/" }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Guosugaz/kun-gz-com" }],
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
