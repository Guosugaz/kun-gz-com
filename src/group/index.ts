import Group from "./group.vue";
import type { App } from "vue";

Group.install = function (app: App) {
  app.component(Group.name, Group);
};

export default Group;
