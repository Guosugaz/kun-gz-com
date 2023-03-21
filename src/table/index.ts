import Table from "./table.vue";
import type { App } from "vue";

Table.install = function (app: App) {
  app.component(Table.name, Table);
};

export default Table;
