/*
 * @Description: 挂载$GZCOM
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2022-01-07 09:50:32
 * @LastEditTime: 2022-01-07 12:45:41
 */
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
  install(Vue, options = {}) {
    Vue.prototype.$GZCOM = Object.assign({}, defaultOptions, options);
  }
};
