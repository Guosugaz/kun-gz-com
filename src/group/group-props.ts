import { buildProps } from "element-plus/es/utils/vue/props/runtime";
import { ExtractPropTypes } from "vue";
import { defaultOptions } from "@core/config-provider";

export const groupProps = buildProps({
  grid: {
    type: [String, Number]
  },
  labelWidth: {
    type: String,
    default: defaultOptions.group.labelWidth
  }
});
export type GroupProps = ExtractPropTypes<typeof groupProps>;
