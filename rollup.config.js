import vue from "rollup-plugin-vue2";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import jsImpoerSass from "./rollup-plugin-js-import-sass";
import clear from "rollup-plugin-clear";

const isProd = process.env.NODE_ENV === "production";
const components = [
  "gz-com",
  "async-message-box",
  "dialog",
  "group",
  "group-item",
  "date-picker-range",
  "table"
];

const external = ["element-ui"];

const componentsConfig = components.map((name) => {
  return {
    input: `src/${name}/index.js`,
    output: {
      name,
      file: `lib/${name}/index.js`,
      format: "es"
    },
    plugins: [
      nodeResolve(),
      alias({
        entries: [
          { find: "@", replacement: "src" },
          { find: "@sugaz/gz-com/lib/utils", replacement: "core/utils" }
        ]
      }),
      vue(),
      jsImpoerSass(),
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"],
        plugins: [["@babel/plugin-transform-runtime"]]
      })
    ],
    external: [...external, "@sugaz/gz-com/lib/utils/index.js"]
  };
});

const indexConfig = {
  input: "src/index.js",
  output: {
    name: "index",
    file: `lib/index.js`,
    format: "umd"
  },
  plugins: [
    nodeResolve(),
    alias({
      entries: [
        { find: "@", replacement: "src" },
        { find: "@sugaz/gz-com/lib/utils", replacement: "core/utils" }
      ]
    }),
    vue(),
    jsImpoerSass(),
    babel({
      presets: ["@babel/preset-env"],
    })
  ],
  external
};

const utilsConfig = {
  input: "core/utils/index.js",
  output: {
    name: "index",
    file: `lib/utils/index.js`,
    format: "es"
  },
  plugins: [
    clear({
      targets: ["lib"]
    }),
    nodeResolve(),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
      plugins: [["@babel/plugin-transform-runtime"]]
    })
  ]
};

const configs = [utilsConfig, ...componentsConfig, indexConfig].map((item) => {
  if (isProd) item.plugins.push(terser());
  return item;
});

export default configs;
