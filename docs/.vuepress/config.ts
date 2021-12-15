import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  title: "kun-el-com",
  description: "element-ui的再封装",
  themeConfig: {
    logo: "https://vuejs.org/images/logo.png"
  },
  plugins: ["demo-container"]
});
