import vue from "rollup-plugin-vue";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
// import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const components = ["async-message-box"];

const plugins = [
  // commonjs(),
  vue(),
  getBabelOutputPlugin({
    presets: ["@babel/preset-env"],
    plugins: [["@babel/plugin-transform-runtime"]]
  }),
  terser()
];

const external = ["element-ui"]

const componentsConfig = components.map((name) => ({
  input: `src/${name}/index.js`,
  output: {
    name,
    file: `lib/${name}/index.js`,
    format: "es"
  },
  plugins,
  external
}));

const indexConfig = {
  input: "src/index.js",
  output: {
    name: "index",
    file: `lib/index.js`,
    format: "es"
  },
  plugins,
  external
};

export default [...componentsConfig, indexConfig];
