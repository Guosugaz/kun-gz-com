import type { App, Plugin } from "vue";
import Group from "./group/index";
import GroupItem from "./group-item/index";
import type { ConfigProviderContext } from "@core/config-provider";
import { provideGlobalConfig } from "@core/hooks";
// import AsyncMessageBox from "./async-message-box/index.js";
// import Dialog from "./dialog/index";
import DatePickerRange from "./date-picker-range/index";
// import Table from "./table/index.js";

export default {
  install(app: App, options: ConfigProviderContext = {} as any) {
    provideGlobalConfig(options, app, true);
    app
      // .use(AsyncMessageBox)
      // .use(Dialog)
      .use(Group as unknown as Plugin)
      .use(GroupItem as unknown as Plugin)
      .use(DatePickerRange as unknown as Plugin);
    // .use(Table);
  },
  // AsyncMessageBox,
  // Dialog,
  Group,
  GroupItem,
  DatePickerRange
  // Table
};
