import { isDef } from "@sugaz/gz-com/lib/utils/index.js";

export default {
  name: "GzTable",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left"
    },
    headerAlign: {
      type: String,
    },
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object
    },
    page: {
      type: Object,
      default() {
        return {
          current: 1,
          total: 1,
          size: 10
        };
      }
    },
    pagination: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    tableProps() {
      const props = Object.assign({}, this.$GZCOM.table, this.$attrs, {
        data: this.data
      });
      delete props.pagination;
      return props;
    },
    pagnationProps() {
      const props = Object.assign(
        {},
        this.$GZCOM.table.pagination,
        this.pagination
      );
      const { currentKey, totalKey, sizeKey } = props;
      return Object.assign(props, {
        currentPage: this.page[currentKey],
        pageSize: this.page[sizeKey],
        total: this.page[totalKey]
      });
    },
    syncedQuery: {
      get() {
        return this.query;
      },
      set(val) {
        this.$emit("upate:query", val);
      }
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.resetLayout();
      });
    }
  },
  methods: {
    resetLayout() {
      this.$refs.table && this.$refs.table.doLayout();
    },
    handleColumnTemplate(h, column) {
      return (slotArgs) => {
        return column.template && column.template(h, slotArgs);
      };
    },
    formatColumnsProps(column) {
      const props = Object.assign({ template: undefined }, column);
      if (this.align && !isDef(column.align)) props.align = this.align;
      if (!isDef(column.headerAlign)) {
        props.headerAlign = this.headerAlign || this.align;
      }
      if (!isDef(column.showOverflowTooltip)) {
        props.showOverflowTooltip = this.showOverflowTooltip;
      }
      return props;
    },
    handleColumnsChildren(h, columns) {
      return columns
        ? columns.map((column) => {
            return h(
              "el-table-column",
              {
                props: this.formatColumnsProps(column)
              },
              [
                column.template
                  ? this.handleColumnTemplate(h, column)
                  : column.slot && this.$scopedSlots[column.slot]
                  ? (slotArgs) => this.$scopedSlots[column.slot](slotArgs)
                  : this.handleColumnsChildren(h, column.children)
              ]
            );
          })
        : null;
    },
    hanldeCurrentChange(current) {
      const { currentKey, sizeKey } = this.pagnationProps;
      this.syncedQuery[currentKey] = current;
      this.$emit("current-change", current);
      this.$emit("update", {
        [currentKey]: current,
        [sizeKey]: this.syncedQuery[sizeKey]
      });
    },
    handleSizeChange(size) {
      const { currentKey, sizeKey } = this.pagnationProps;
      this.syncedQuery[currentKey] = 1;
      this.syncedQuery[sizeKey] = size;
      this.$emit("size-change", size);
      this.$emit("update", {
        [currentKey]: 1,
        [sizeKey]: size
      });
    }
  },
  render(h) {
    return h(
      "div",
      {
        directives: [{ name: "loading", value: this.loading }]
      },
      [
        h(
          "el-table",
          {
            ref: "table",
            props: this.tableProps,
            on: this.$listeners
          },
          [this.handleColumnsChildren(h, this.columns), this.$slots.default]
        ),
        h("el-pagination", {
          class: "gz-table_pagination",
          props: this.pagnationProps,
          on: Object.assign({}, this.$listeners, {
            "current-change": this.hanldeCurrentChange,
            "size-change": this.handleSizeChange
          })
        })
      ]
    );
  }
};
