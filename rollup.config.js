import vue from "rollup-plugin-vue";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import jsImpoerSass from "./rollup-plugin-js-import-sass";

const components = ["async-message-box", "dialog"];

const plugins = [
  nodeResolve(),
  alias({
    entries: [{ find: "@", replacement: "src" }]
  }),
  vue(),
  jsImpoerSass(),
  getBabelOutputPlugin({
    presets: ["@babel/preset-env"],
    plugins: [["@babel/plugin-transform-runtime"]]
  }),
  terser()
];

const external = ["vue", "element-ui"];

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
