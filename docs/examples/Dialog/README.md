## Dialog 对话框

> `elmenet-ui`的[Dialog](https://element.eleme.cn/#/zh-CN/component/input)再封装，提供了全屏、刷新的功能

### 单独引入

```js
import Vue from "vue";
import Dialog from "@sugaz/gz-com/lib/dialog";
import "@sugaz/gz-com/lib/theme-default/dialog.css";

Vue.use(Dialog);
```

### 示例

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框，确认时会等待接口返回才关闭。

:::demo `width`有三种默认值可选`large`、`normal`、`small`，默认是高度居中，由`top`控制

```html
<template>
  <div>
    <el-button @click="showDialog = true">新增角色</el-button>
    <gz-dialog
      :show.sync="showDialog"
      title="新增角色"
      :width="form.width"
      :showFullscreen="form.showFullscreen"
      :top="form.top"
      :refresh="queryDetail"
    >
      <el-form v-loading="loading" :model="form" label-width="80px">
        <el-form-item label="宽度">
          <el-radio-group v-model="form.width">
            <el-radio label="large">large</el-radio>
            <el-radio label="normal">normal</el-radio>
            <el-radio label="small">small</el-radio>
            <el-radio label="500px">500px</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无全屏">
          <el-switch v-model="form.showFullscreen" />
        </el-form-item>
        <el-form-item label="顶部距离">
          <el-radio-group v-model="form.top">
            <el-radio :label="undefined">居中</el-radio>
            <el-radio label="10vh">10vh</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="20" placeholder="请输入内容" />
        </el-form-item>
      </el-form>

      <el-button slot="footer" size="small" type="primary" @click="onSubmit">
        确 认
      </el-button>
    </gz-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          width: "normal",
          showFullscreen: true,
          top: undefined
        },
        loading: false,
        showDialog: false
      };
    },
    methods: {
      queryDetail() {
        if (this.loading) return;
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      onSubmit() {}
    }
  };
</script>
```

:::

### 属性

`element-ui`的`Dialog`绝大部分属性和事件都能复用

以下是调整和新增的属性说明：

| 参数           | 说明                                                             | 类型     | 可选值 | 默认值 |
| -------------- | ---------------------------------------------------------------- | -------- | ------ | ------ |
| show           | 是否显示 Dialog，支持 .sync 修饰符                               | boolean  |        | false  |
| width          | 有三种 tpye 可选 normal large，small，也可以传普通的单位如 500px | string   |        | normal |
| top            | 距离顶部高度，如果不传就是高度居中                               | string   |        |        |
| refresh        | 点击刷新按钮的回调函数                                           | Function |        |        |
| showFullscreen | 是否有全屏按钮                                                   | boolean  |        | true   |
