/*
 * @Description: 异步的MessageBox
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-12-14 13:43:52
 * @LastEditTime: 2021-12-15 14:04:35
 */
import { MessageBox, Loading } from "element-ui";

const defaultOptions = {
  showClose: false,
  closeOnClickModal: false,
  loadingText: "操作中...",
  isAsync: true, // 是否要异步
  isNums: false // 输入框是否为数字
};

function createBox (type = "confirm") {
  return function (options, cb, cancel) {
    options = { ...defaultOptions, ...options };
    MessageBox[type](options.message, {
      beforeClose: (action, instance, done) => {
        let loading;
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
          cb &&
            cb(
              (success = true) => {
                loading && loading.close();
                success && done();
              },
              action,
              instance
            );
        } else {
          cancel && cancel();
          done();
        }
      },
      ...options
    }).catch((e) => {
      /**/
    });
  };
}

export default {
  ayConfirm: createBox(),
  ayPrompt: createBox("prompt")
}
