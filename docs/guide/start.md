# 快速上手

跟随以下的步骤，快速上手组件库的使用。


## Vue 版本
**vue >= 3.2.0**
::: warning 💡 友情提示
由于 Vue3 不再支持 IE 浏览器环境，seven-bit-ui 也不再支持 IE 浏览器环境。
:::

### 安装

```js
// npm
npm i -S @sugaz/gz-com

// yarn
yarn add @sugaz/gz-com
```

### 全局引入

```js
import Vue from "vue";
import GzCom from "@sugaz/gz-com";
import "@sugaz/gz-com/lib/theme-default/index.css";

Vue.use(GzCom);

/* 或写为
 * Vue.use(GzCom, {
 *   // GzCom 配置，下面有说明
 * });
 */
```

### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "@sugaz/gz-com",
        "styleLibraryName": "theme-default"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Group，那么需要在 main.js 中写入以下内容：

```js
import Vue from "vue";
import { Group, GzCom } from "@sugaz/gz-com";
import App from "./App.vue";

Vue.use(GzCom); // 全局初始化配置
Vue.use(Group);
/* 或写为
 * Vue.component("your-group"), Group);
 */

new Vue({
  el: "#app",
  render: (h) => h(App)
});
```

### GzCom 配置

引入该库时，有些组件会使用到全局配置，如`Table`组件，在<strong>按需引用</strong>时必须要手动引入

```js
import Vue from "vue";
import { GzCom } from "@sugaz/gz-com";

Vue.use(GzCom, {
  /* options */
});
```

默认的 options

```js
{
    // 表格的props
    table: {
    border: true,
    // 分页的props
    pagination: {
      layout: "prev, pager, next, total",
      currentKey: "current",
      totalKey: "total",
      sizeKey: "size"
    }
  }
}
```
