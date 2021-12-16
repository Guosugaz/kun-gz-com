const path = require("path");

module.exports = {
  title: "kun-el-com",
  description: "element-ui的再封装",
  plugins: ["demo-container"],
  alias: {
    "@lib": path.resolve(__dirname, "../lib")
  },
  themeConfig: {
    logo: "/logo.gif",
    sidebarDepth: 0,
    sidebar: [
      ["/", "快速上手"],
      ["/AsyncMessageBox/", "AsyncMessageBox"]
    ],
    nav: [
      { text: 'Github', link: 'https://github.com/Guosugaz/kun-el-com', target:'_blank' }
    ]
  }
};
