## AsyncMessageBox 异步弹框

> `elmenet-ui`的[MessageBox](https://element.eleme.cn/#/zh-CN/component/message-box)再封装，主要是封装了`confirm`和`prompt`的异步内容提交

### 单独引入

```js
import Vue from "vue";
import AsyncMessageBox from "@sugaz/el-com/lib/async-message-box";

Vue.prototype.$ayConfirm = AsyncMessageBox.ayConfirm;
Vue.prototype.$ayPrompt = AsyncMessageBox.ayPrompt;
```

### 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框，确认时会等待接口返回才关闭。

:::demo 可以传三个参数，第一个参数跟`MessageBox`的`Options`配置一样，第二个参数是确认回调函数,回调一个对象，其中`done`函数用于关闭 loading 和弹框，第三个是取消回调函数

```html
<template>
  <el-button @click="handleClick(true)">成功操作</el-button>
  <el-button type="danger" @click="handleClick(false)">失败操作</el-button>
</template>

<script>
  export default {
    methods: {
      handleClick(success) {
        this.$ayConfirm(
          {
            title: "操作提示",
            message: "是否要删除该项？"
          },
          ({ done }) => {
            setTimeout(() => {
              this.$message[success ? "success" : "error"](
                success ? "操作成功" : "操作失败"
              );
              done(success);
            }, 1000);
          },
          () => {
            this.$message.info("取消");
          }
        );
      }
    }
  };
</script>
```

:::

### 提交内容

当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

:::demo 第二个参数是确认回调函数中的参数是一个对象，有 key `instance`和`action`分别是`MessageBox`的`Options`里的`callback`中的`instance`和`action`，如果需要获取输入的 value 为 number 可以在`Options`里传`isNums`，`true`时就是 number 类型

```html
<template>
  <el-button @click="handleClick">修改价格</el-button>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        this.$ayPrompt(
          {
            title: "修改价格",
            message: "请在下方输入框输入价格",
            inputPlaceholder: "请输入价格",
            inputErrorMessage: "请输入正确的价格格式",
            inputPattern: /^\d+(\.(?=\d))?\d{0,2}$/,
            isNums: true
          },
          ({ done, instance: { inputValue } }) => {
            setTimeout(() => {
              this.$message.success(`操作成功 价格为 ${inputValue}`);
              done();
            }, 1000);
          },
          () => {
            this.$message.info("取消");
          }
        );
      }
    }
  };
</script>
```

:::

### 第一个参数 Options

复用了[MessageBox](https://element.eleme.cn/#/zh-CN/component/message-box)的 Options，核心主要是修改了`beforeClose`来实现，如无必要别传这个参数

下面是增加或者修改的说明：

| 参数        | 说明                                     | 类型    | 可选值 | 默认值    |
| ----------- | ---------------------------------------- | ------- | ------ | --------- |
| isNum       | 修改`instance.inputValue`的类型为 number | boolean |        | true      |
| isAsync     | 是否异步                                 | boolean |        | true      |
| loadingText | loading 的提示语                         | string  |        | 操作中... |

### 第二个参数 Confirm Callback

确认的回调函数，下面是返回的参数说明

| 参数     | 说明                                                                                        | 类型              | 可选值 | 默认值            |
| -------- | ------------------------------------------------------------------------------------------- | ----------------- | ------ | ----------------- |
| done     | 用于关闭弹框和 loading，参数可传 boolean，传入`true`关闭弹窗和 loading，`false`取消 loading | function(boolean) |        | 直接调用是传 true |
| instance | `MessageBox`的`Options`里的`callback`中的`instance`                                         |                   |        |                   |
| action   | `MessageBox`的`Options`里的`callback`中的`action`                                           |                   |        |                   |

### 第三个参数 Cancel Callback

取消的回调函数
