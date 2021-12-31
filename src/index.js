import AsyncMessageBox from "./async-message-box/index.js";
import Dialog from "./dialog/index";
import Group from "./group/index.js";
import GroupItem from "./group-item/index.js";
import DatePickerRange from "./date-picker-range/index.js";

export default {
  install(Vue) {
    Vue.use(AsyncMessageBox);
    Vue.use(Dialog);
    Vue.use(Group);
    Vue.use(GroupItem);
    Vue.use(DatePickerRange);
  },
  AsyncMessageBox,
  Dialog,
  Group,
  GroupItem,
  DatePickerRange,
};
