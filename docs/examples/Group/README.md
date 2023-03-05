## Group

> Group 常用与列表的筛选布局和表单的布局，可以根据屏幕大小自动计算每列放 item 的数量，注：Group 必选搭配 GroupItem 使用

### 单独引入

```js
import Vue from "vue";
import Group from "@sugaz/gz-com/lib/group";
import GroupItem from "@sugaz/gz-com/lib/group-item";
import "@sugaz/gz-com/lib/theme-default/group.css";
import "@sugaz/gz-com/lib/theme-default/group-item.css";

Vue.use(Group);
Vue.use(GroupItem);
```

### 示例

:::demo `group`的`labelWidth`可以统一修改`group-item`的 label 宽度，若`group`不传`grid`就是自动计算每列的 item 数量

```html
<template>
  <div>
    <gz-group labelWidth="80px" grid="3">
      <gz-group-item label="名称" span="1">
        <span slot="label">
          名称
          <el-tooltip effect="dark" content="最多4位" placement="top-start">
            <i class="el-icon-warning" />
          </el-tooltip>
        </span>
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="年龄">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="地址">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="身高">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="体重">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item align="right">
        <el-button>清空</el-button>
        <el-button type="primary">搜索</el-button>
      </gz-group-item>
    </gz-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          input: ""
        }
      };
    }
  };
</script>
```

:::

### Group props

| 参数       | 说明                                               | 类型           | 可选值 | 默认值 |
| ---------- | -------------------------------------------------- | -------------- | ------ | ------ |
| grid       | 每列存放 Item 的个数，不传就是根据块的宽度自动计算 | sting / number |        |        |
| labelWidth | `gourp-item`的 label 宽度                          | sting          |        | 90px   |

### Group Item props

| 参数  | 说明           | 类型           | 可选值              | 默认值 |
| ----- | -------------- | -------------- | ------------------- | ------ |
| span  | 列的宽度       | sting / number |                     | 1      |
| width | label 的宽度   | sting          |                     | 90px   |
| align | 内容的对齐方式 | sting          | left、right、center | left   |

### Group Item slot

| name  | 说明         |
| ----- | ------------ |
| label | 自定义 label |
