<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="around"
    :style="`width: ${width}`"
    :format="format"
    :value-format="valueFormat"
    :type="type"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :picker-options="pickerOptions"
    @blur="handleBlur"
  />
</template>

<script>
  import { isDef } from "@sugaz/gz-com/lib/utils/index.js";

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
      // 是否有时间限制，单位 日
      range: {
        type: Number
      },
      format: {
        type: String,
        default: "yyyy-MM-dd"
      },
      valueFormat: {
        type: String,
        default: "yyyy-MM-dd"
      },
      startPlaceholder: {
        type: String,
        default: "开始日期"
      },
      endPlaceholder: {
        type: String,
        default: "结束日期"
      }
    },
    data() {
      return {
        pickStart: "",
        pickerOptions: {
          disabledDate: this.disabledDate,
          onPick: this.handleOnPick
        }
      };
    },
    computed: {
      around: {
        get() {
          const start = isDef(this.start) ? this.start : "";
          const end = isDef(this.end) ? this.end : "";
          return [start, end];
        },
        set(val) {
          val = val || [];
          this.syncedStart = val[0] || "";
          this.syncedEnd = val[1] || "";
        }
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
    },
    methods: {
      handleOnPick({ minDate }) {
        this.pickStart = minDate || "";
      },
      handleBlur() {
        this.pickStart = "";
        this.$emit("blur");
      },
      disabledDate(val) {
        if (!isDef(this.range)) return false;
        val = new Date(val).getTime();
        let start = this.start ? this.start + " 00:00:00" : "";
        if (this.pickStart) start = this.pickStart;
        if (start) {
          const mapStart = new Date(start).getTime();
          if (mapStart > val) {
            return true;
          }
          if (this.range) {
            let time = this.range * 24 * 3600 * 1000;
            let end = mapStart + time;
            if (end < val) {
              return true;
            }
          }
        }
        return false;
      }
    }
  };
</script>
