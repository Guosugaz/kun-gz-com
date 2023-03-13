export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol
} from "@vue/shared";

export const isDef = (value: any) => {
  return value !== undefined && value !== null;
};
