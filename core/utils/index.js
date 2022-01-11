export const isDef = (value) => {
  return value !== undefined && value !== null;
};

/**
 * @description: 节流throttle代码（时间戳+定时器）
 * @param {Function} func 回调函数
 * @param {number} delay 延迟时间
 * @param {boolean} init 是否在第一次立刻执行
 * @return {Function}
 */
export const throttle = (func, delay, init) => {
  let timer = null;
  let startTime = Date.now();
  let hasInit = init;
  return function () {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;
    if (isDef(hasInit)) {
      func.apply(context, args);
      hasInit = null;
    }
    if (timer) clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};
