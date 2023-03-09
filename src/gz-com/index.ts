/*
 * @Description: 挂载$GZCOM
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2022-01-07 09:50:32
 * @LastEditTime: 2023-03-07 10:31:36
 */
import type { App } from "vue";

const defaultOptions = {
  table: {
    border: true,
    // 分页的配置
    pagination: {
      layout: "prev, pager, next, total",
      currentKey: "current",
      totalKey: "total",
      sizeKey: "size"
    }
  }
};

export default {
  install(app: App, options = {}) {
    app.config.globalProperties.$GZCOM = Object.assign({}, defaultOptions, options);
  }
};
