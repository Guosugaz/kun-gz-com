import vue from "rollup-plugin-vue2";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import jsImpoerSass from "./rollup-plugin-js-import-sass";
import clear from "rollup-plugin-clear";

const isProd = process.env.NODE_ENV === "production";
const components = [
  "GZCOM",
  "async-message-box",
  "dialog",
  "group",
  "group-item",
  "date-picker-range",
  "table"
];

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
  })
];

if (isProd) {
  plugins.unshift(
    clear({
      targets: ["lib"]
    })
  );
  plugins.push(terser());
}

const external = ["element-ui"];

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
