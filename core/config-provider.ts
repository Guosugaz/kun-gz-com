import type { GzPaginationProps } from "@/table/table.props";
import type { InjectionKey, Ref } from "vue";
import type { GroupProps } from "../src/group/group-props";

export type ConfigProviderContext = {
  group: GroupProps;
  pagination: GzPaginationProps;
};

export const defaultOptions = {
  group: {
    labelWidth: "90px"
  },
  pagination: {
    currentPage: 1,
    total: 1,
    pageSize: 10,
    currentKey: "current",
    sizeKey: "size",
    totalKey: "total"
  }
};

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
