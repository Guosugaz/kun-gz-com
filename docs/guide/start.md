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

```ts
// main.ts
import { createApp } from 'vue'
import GzCom from "@sugaz/gz-com";
import "@sugaz/gz-com/lib/theme-default/index.css";
import App from './App.vue'

const app = createApp(App)

app.use(GzCom, {
  /* 全局options，默认配置core/config-provider.ts */
})
app.mount('#app')
```

### 按需引入

借助 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)，我们可以只引入需要的组件，以达到减小项目体积的目的。

```
yarn add -D unplugin-vue-components
```

#### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { GzComResolver } from '@sugaz/gz-com/resolver/resolver.cjs'

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [GzComResolver()],
    }),
  ],
})
```