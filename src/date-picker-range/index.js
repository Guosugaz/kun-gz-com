/*
 * @Description: 时间范围封装
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-30 09:56:39
 * @LastEditTime: 2022-01-04 10:07:34
 */
import DatePickerRange from "./date-picker-range.vue";

DatePickerRange.install = function (Vue) {
  Vue.component(DatePickerRange.name, DatePickerRange);
};

export default DatePickerRange;
