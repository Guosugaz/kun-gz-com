/*
 * @Description: 挂载$GZCOM
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2022-01-07 09:50:32
 * @LastEditTime: 2023-03-10 11:20:25
 */
import type { App } from "vue";

const defaultOptions = {
  group: {
    labelWidth: "90px"
  },
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
    app.config.globalProperties.$GZCOM = Object.assign(
      {},
      defaultOptions,
      options
    );
  }
};
