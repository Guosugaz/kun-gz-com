// import AsyncMessageBox from "./async-message-box/index.js";
// import Dialog from "./dialog/index";
import type { App, Plugin } from "vue";
import Group from "./group/index";
import GroupItem from "./group-item/index";
// import DatePickerRange from "./date-picker-range/index.js";
// import Table from "./table/index.js";
import GzCom from "./gz-com/index";

export default {
  install(app: App) {
    app
      .use(GzCom)
      // .use(AsyncMessageBox)
      // .use(Dialog)
      .use(Group as unknown as Plugin)
      .use(GroupItem as unknown as Plugin)
    // .use(DatePickerRange)
    // .use(Table);
  },
  // AsyncMessageBox,
  // Dialog,
  Group,
  GroupItem,
  // DatePickerRange,
  GzCom
  // Table
};
