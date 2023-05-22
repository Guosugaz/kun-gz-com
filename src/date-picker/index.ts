/*
 * @Description: 时间范围封装
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-30 09:56:39
 * @LastEditTime: 2023-05-15 15:42:11
 */
import DatePicker from "./date-picker.vue";
import type { App } from "vue";

DatePicker.install = function (app: App) {
  app.component(DatePicker.name, DatePicker);
};

export { DatePicker };

export default DatePicker;
