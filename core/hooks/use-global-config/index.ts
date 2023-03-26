import { computed, getCurrentInstance, inject, provide, ref, unref } from "vue";
import {
  configProviderContextKey,
  ConfigProviderContext,
  defaultOptions,
} from "../../config-provider";
import { debugWarn, keysOf } from "../../utils";

import type { MaybeRef } from "@vueuse/core";
import type { App, Ref } from "vue";

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = ref<ConfigProviderContext>(defaultOptions as any);

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
) => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() can only be used inside setup()."
    );
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) {
      if (global) {
        return deepMerge(defaultOptions, cfg);
      } else {
        return cfg;
      }
    }
    return deepMerge(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  console.log(context.value);
  return context;
};

function deepMerge(target: any, source: any) {
  const temp = deepClone(target);
  if (typeof target !== "object" || typeof source !== "object") return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== "object") {
        temp[prop] = source[prop];
      } else {
        if (typeof source[prop] !== "object") {
          temp[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            temp[prop] = target[prop].concat(source[prop]);
          } else {
            temp[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      temp[prop] = source[prop];
    }
  }
  return temp;
}

function deepClone(obj: any) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    //原始类型直接返回
    return obj;
  }
  const o = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      (o as any)[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
