const path = require("path");

module.exports = {
  title: "kun-el-com",
  description: "element-ui的再封装",
  themeConfig: {
    logo: "https://vuejs.org/images/logo.png"
  },
  plugins: ["demo-container"],
  alias: {
    "@lib": path.resolve(__dirname, "../lib")
  }
};
