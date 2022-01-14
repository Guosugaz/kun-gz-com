import AsyncMessageBox from "./async-message-box/index.js";
import Dialog from "./dialog/index";
import Group from "./group/index.js";
import GroupItem from "./group-item/index.js";
import DatePickerRange from "./date-picker-range/index.js";
import Table from "./table/index.js";
import GzCom from "./gz-com/index.js";

export default {
  install(Vue) {
    Vue.use(GzCom)
      .use(AsyncMessageBox)
      .use(Dialog)
      .use(Group)
      .use(GroupItem)
      .use(DatePickerRange)
      .use(Table);
  },
  AsyncMessageBox,
  Dialog,
  Group,
  GroupItem,
  DatePickerRange,
  GzCom,
  Table
};
