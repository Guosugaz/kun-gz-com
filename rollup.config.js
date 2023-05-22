import vue from "@vitejs/plugin-vue";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import jsImpoerSass from "./rollup-plugin-js-import-sass.js";
import clear from "rollup-plugin-clear";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import components from "./component-list.js";

const isProd = process.env.NODE_ENV === "production";

const external = [
  "element-plus",
  /element-plus\/.+/,
  "vue",
  "rxjs",
  "@element-plus/icons-vue"
];

const typePlugin = typescript({
  check: false,
  useTsconfigDeclarationDir: true
});

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
      vue(),
      jsImpoerSass(),
      typePlugin,
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
    vue({ isProduction: isProd }),
    alias({
      entries: [
        { find: "@", replacement: "src" },
        { find: /@core\/(.+)/, replacement: "core/$1" }
      ]
    }),
    typePlugin,
    jsImpoerSass()
    // getBabelOutputPlugin({
    //   presets: ["@babel/env", { modules: "umd" }]
    // })
  ],
  external
};

const utilsConfig = {
  input: {
    "utils/index": "core/utils/index.ts",
    "hooks/index": "core/hooks/index.ts",
    "config-provider": "core/config-provider.ts"
  },
  output: {
    // name: "index",
    // file: `lib/utils/index.js`,
    dir: "lib",
    entryFileNames: "[name].js",
    format: "es"
  },
  plugins: [
    clear({
      targets: ["lib"]
    }),
    nodeResolve(),
    typePlugin,
    getBabelOutputPlugin({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      presets: ["@babel/preset-env"],
      plugins: [["@babel/plugin-transform-runtime"]]
    })
  ],
  external
};

function getList() {
  let list = [utilsConfig, indexConfig];
  if (isProd) list = list.concat(componentsConfig);
  return list;
}

const configs = getList().map((item) => {
  if (isProd) item.plugins.push(terser());
  return item;
});

export default configs;
