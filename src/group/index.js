import Group from "./group.js";

Group.install = function (Vue) {
  Vue.component(Group.name, Group);
};

export default Group;
