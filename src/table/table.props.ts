import {
  buildProps,
  definePropType
} from "element-plus/es/utils/vue/props/runtime";
import { ExtractPropTypes } from "vue";
import type { TableColumnCtx, PaginationProps } from "element-plus";

export interface Column<T = Record<string, any>>
  extends Partial<Omit<TableColumnCtx<any>, "children">> {
  slot?: string;
  template?: (data: { row: T; $index: number; column: Column<T> }) => any;
  children?: Column<T>[];
}

export interface GzPaginationProps extends Partial<PaginationProps> {
  currentKey?: string;
  sizeKey?: string;
  totalKey?: string;
}

export const tableProps = buildProps({
  columns: {
    type: definePropType<Column[]>(Array),
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  query: {
    type: Object,
    required: true,
    default: () => ({})
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  fn: {
    type: Function
  }
});
export type TableProps = ExtractPropTypes<typeof tableProps>;
