function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { MessageBox, Loading } from 'element-ui';
/*
 * @Description: 异步的MessageBox
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-14 13:43:52
 * @LastEditTime: 2021-12-15 14:04:35
 */

var defaultOptions = {
  showClose: false,
  closeOnClickModal: false,
  loadingText: "操作中...",
  isAsync: true,
  // 是否要异步
  isNums: false // 输入框是否为数字

};

function createBox() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "confirm";
  return function (options, cb, cancel) {
    options = _objectSpread(_objectSpread({}, defaultOptions), options);
    MessageBox[type](options.message, _objectSpread({
      beforeClose: function beforeClose(action, instance, done) {
        var loading;

        if (action === "confirm") {
          if (options.isAsync) {
            loading = Loading.service({
              target: ".el-message-box",
              lock: true,
              text: options.loadingText
            });
          }

          if (options.isNum && type === "prompt" && instance.inputValue) {
            instance.inputValue = Number(instance.inputValue.trim()) || 0;
          }

          cb && cb(function () {
            var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            loading && loading.close();
            success && done();
          }, action, instance);
        } else {
          cancel && cancel();
          done();
        }
      }
    }, options))["catch"](function (e) {
      /**/
    });
  };
}

var index = {
  ayConfirm: createBox(),
  ayPrompt: createBox("prompt")
};
export { index as default };
