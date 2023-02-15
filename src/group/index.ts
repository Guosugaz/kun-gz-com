import Group from "./group.js";
import type { App } from "vue";

Group.install = function (app: App) {
  app.component(Group.name, Group);
};

export default Group;
