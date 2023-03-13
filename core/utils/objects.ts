export const keysOf = <T>(arr: T) => Object.keys(arr as object) as Array<keyof T>;
