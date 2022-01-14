const path = require("path");

module.exports = {
  base: "/kun-gz-com",
  dest: path.resolve(__dirname, "../../dist"),
  title: "GzCom",
  description: "封装平时搭建的通用组件",
  plugins: ["demo-container"],
  themeConfig: {
    logo: "/logo.gif",
    sidebarDepth: 0,
    sidebar: [
      ["/", "快速上手"],
      ["/AsyncMessageBox/", "AsyncMessageBox"],
      ["/Dialog/", "Dialog"],
      ["/Group/", "Group"],
      ["/DatePickerRange/", "DatePickerRange"],
      ["/Table/", "Table"],
    ],
    nav: [
      { text: 'Github', link: 'https://github.com/Guosugaz/kun-el-com', target:'_blank' }
    ]
  }
};
