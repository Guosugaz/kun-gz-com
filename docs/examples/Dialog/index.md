## Dialog 对话框

> `elmenet-ui`的[Dialog](https://element.eleme.cn/#/zh-CN/component/dialog)再封装，提供了全屏、刷新的功能

:::code Dialog/index.vue
:::
### 属性

`element-ui`的`Dialog`绝大部分属性和事件都能复用

以下是调整和新增的属性说明：

| 参数           | 说明                                                             | 类型     | 可选值 | 默认值 |
| -------------- | ---------------------------------------------------------------- | -------- | ------ | ------ |
| show           | 是否显示 Dialog，支持 .sync 修饰符                               | boolean  |        | false  |
| width          | 如 600px | string   |        | 500px |
| top            | 距离顶部高度，如果不传就是高度居中                               | string   |        |        |
| refresh        | 点击刷新按钮的回调函数                                           | Function |        |        |
| showFullscreen | 是否有全屏按钮                                                   | boolean  |        | true   |
