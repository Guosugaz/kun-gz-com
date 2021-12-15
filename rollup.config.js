import vue from "rollup-plugin-vue";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

const components = ["async-message-box"];

const componentsConfig = components.map((name) => ({
  input: `src/${name}/index.js`,
  output: {
    name,
    file: `lib/${name}/index.js`,
    format: "es"
  },
  plugins: [
    commonjs(),
    vue(),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
    //   plugins: [["@babel/plugin-transform-runtime"]]
    })
  ],
  external: ["element-ui"]
}));

export default [...componentsConfig];
