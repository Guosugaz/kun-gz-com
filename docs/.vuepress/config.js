const path = require("path");

module.exports = {
  title: "GzCom",
  description: "封装平时搭建的通用组件",
  plugins: ["demo-container"],
  alias: {
    "@lib": path.resolve(__dirname, "../lib")
  },
  themeConfig: {
    logo: "/logo.gif",
    sidebarDepth: 0,
    sidebar: [
      ["/", "快速上手"],
      ["/AsyncMessageBox/", "AsyncMessageBox"],
      ["/Dialog/", "Dialog"],
      ["/Group/", "Group"],
    ],
    nav: [
      { text: 'Github', link: 'https://github.com/Guosugaz/kun-el-com', target:'_blank' }
    ]
  }
};
