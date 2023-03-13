import { buildProps } from "element-plus/es/utils/vue/props/runtime";
import { ExtractPropTypes } from "vue";

export const groupItemProps = buildProps({
  span: {
    type: [String, Number],
    default: "1"
  },
  label: {
    type: String,
    require: true,
    default: ""
  },
  width: {
    type: String,
    default: ""
  },
  customClass: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    values: ["left", "center", "right"],
    default: "left"
  }
});

export type GroupItemProps = ExtractPropTypes<typeof groupItemProps>;
