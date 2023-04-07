/*
 * @Description: 时间范围封装
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-30 09:56:39
 * @LastEditTime: 2023-03-10 11:19:07
 */
import DatePickerRange from "./date-picker-range.vue";
import type { App } from "vue";

DatePickerRange.install = function (app: App) {
  app.component(DatePickerRange.name, DatePickerRange);
};

export { DatePickerRange };

export default DatePickerRange;
