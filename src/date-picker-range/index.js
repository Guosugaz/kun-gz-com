/*
 * @Description: 时间范围封装
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-30 09:56:39
 * @LastEditTime: 2021-12-31 17:45:27
 */
import DatePickerRange from "./date-picker-range";

DatePickerRange.install = function (Vue) {
  Vue.component(DatePickerRange.name, DatePickerRange);
};

export default DatePickerRange;
