import type { InjectionKey, Ref } from "vue";
import type { GroupProps } from "../src/group/group-props";

export type ConfigProviderContext = {
  group: GroupProps;
};

export const defaultOptions = {
  group: {
    labelWidth: "90px"
  }
};

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
