import vue from "@vitejs/plugin-vue";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import jsImpoerSass from "./rollup-plugin-js-import-sass";
import clear from "rollup-plugin-clear";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";

const isProd = process.env.NODE_ENV === "production";
const components = [
  // "gz-com",
  // "async-message-box",
  // "dialog",
  "group",
  "group-item"
  // "date-picker-range",
  // "table"
];

const external = ["element-plus", "vue", "rxjs"];

const componentsConfig = components.map((name) => {
  return {
    input: `src/${name}/index.ts`,
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
          { find: /@core\/(.+)/, replacement: "@sugaz/gz-com/lib/$1" }
        ]
      }),
      typescript(/*{ plugin options }*/),
      vue(),
      jsImpoerSass(),
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"],
        plugins: [["@babel/plugin-transform-runtime"]]
      })
    ],
    external: [...external, /@sugaz\/gz-com\/.+/]
  };
});

const indexConfig = {
  input: "src/index.ts",
  output: {
    name: "index",
    file: `lib/index.js`,
    format: "es"
  },
  plugins: [
    nodeResolve(),
    alias({
      entries: [
        { find: "@", replacement: "src" },
        { find: /@core\/(.+)/, replacement: "core/$1" }
      ]
    }),
    typescript(/*{ plugin options }*/),
    vue(),
    jsImpoerSass(),
    // getBabelOutputPlugin({
    //   presets: ["@babel/env", { modules: "umd" }]
    // })
  ],
  external
};

const utilsConfig = {
  input: "core/utils/index.ts",
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
    typescript(/*{ plugin options }*/),
    getBabelOutputPlugin({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      presets: ["@babel/preset-env"],
      plugins: [["@babel/plugin-transform-runtime"]]
    })
  ]
};

const configs = [utilsConfig, indexConfig, ...componentsConfig].map((item) => {
  if (isProd) item.plugins.push(terser());
  return item;
});

export default configs;
