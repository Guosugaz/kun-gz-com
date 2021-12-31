import { isDef } from "@sugaz/utils";

export default {
  name: "GzDatePickerRange",
  props: {
    // 显示类型 year/month/date/week/ datetime/datetimerange/daterange
    type: {
      type: String,
      default: "daterange"
    },
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    width: {
      type: String
    },
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd",
    },
  },
  computed: {
    around: {
      get() {
        const start = isDef(this.start) ? this.start : "";
        const end = isDef(this.end) ? this.start : "";
        return [start, end];
      },
      set(val) {
        console.log(val)
        const [start, end] = val;
        this.syncedStart = start || "";
        this.syncedEnd = end || "";
      },
      syncedStart: {
        get() {
          return this.start;
        },
        set(val) {
          this.$emit("update:start", val);
        }
      },
      syncedEnd: {
        get() {
          return this.end;
        },
        set(val) {
          this.$emit("update:end", val);
        }
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log("handleChange=====",val)
      this.around = val;
      // let [start, end] = val;
      // // 如果其中一个为空，就两个都为空
      // if (!start || !end) {
      //   start = end = "";
      // }
      // this.syncedStart = start;
      // this.syncedEnd = end;
      this.$emit("change");
    }
  },
  render(h) {
    console.log(this.valueFormat)
    return h("el-date-picker", {
      props: {
        ...this.$attrs,
        value: this.around,
        type: this.type,
        format: this.format,
        valueFormat: this.valueFormat,
      },
      style: {
        width: this.width
      },
      on: {
        ...this.$listeners,
        change: this.handleChange
      }
    });
  }
};
