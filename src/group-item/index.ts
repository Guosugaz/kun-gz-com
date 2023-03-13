import GroupItem from "./group-item.vue";
import type { App } from "vue";

GroupItem.install = function (app: App) {
  app.component(GroupItem.name, GroupItem);
};

export default GroupItem;
