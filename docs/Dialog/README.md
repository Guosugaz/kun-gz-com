## Dialog 对话框

> `elmenet-ui`的[Dialog](https://element.eleme.cn/#/zh-CN/component/input)再封装，提供了全屏、刷新的功能

### 单独引入

```js
import Vue from "vue";
import Dialog from "@sugaz/gz-com/lib/dialog";
import "@sugaz/gz-com/lib/theme-default/dialog.scss";

Vue.use(Dialog);
```

### 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框，确认时会等待接口返回才关闭。

:::demo `width`有三种默认值可选`large`、`normal`、`small`，

```html
<template>
  <div>
    <el-button @click="showDialog = true">新增角色</el-button>
    <gz-dialog :show.sync="showDialog" title="新增角色" :width="form.width">
      <el-form :model="form" label-width="80px">
        <el-form-item label="宽度">
          <el-radio-group v-model="form.width">
            <el-radio label="large">large</el-radio>
            <el-radio label="normal">normal</el-radio>
            <el-radio label="small">small</el-radio>
            <el-radio label="500px">500px</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-button slot="footer" type="primary" @click="onSubmit">
        Create
      </el-button>
    </gz-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          width: "normal"
        },
        showDialog: false
      };
    },
    methods: {
      onSubmit() {}
    }
  };
</script>
```

:::
