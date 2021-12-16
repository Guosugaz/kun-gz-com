import { MessageBox, Loading } from "element-ui";

const defaultOptions = {
  showClose: false,
  closeOnClickModal: false,
  loadingText: "操作中...",
  isAsync: true, // 是否要异步
  isNums: false, // 输入框是否为数字
  callback() {
    /**/
  }
};

function createBox(type = "confirm") {
  return function (options = {}, cb, cancel) {
    options = Object.assign(defaultOptions, options, {
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
            cb({
              done(success = true) {
                loading && loading.close();
                success && done();
              },
              instance,
              action
            });
        } else {
          cancel && cancel();
          done();
        }
      }
    });
    MessageBox[type](options.message, options);
  };
}

const ayConfirm = createBox();
const ayPrompt = createBox("prompt");

export default {
  install(Vue) {
    Vue.prototype.$ayConfirm = ayConfirm;
    Vue.prototype.$ayPrompt = ayPrompt;
  },
  ayConfirm,
  ayPrompt
};
