## DatePickerRange

> 时间范围再封装，主要是支持直接修改对象的值，不用再声明数组来取值

### 单独引入

```js
import Vue from "vue";
import DatePickerRange from "@sugaz/gz-com/lib/date-picker-range";

Vue.use(DatePickerRange);
```

### 示例

:::demo

```html
<template>
  <div>
    <gz-group labelWidth="80px" grid="3">
      <gz-group-item label="默认">
        <gz-date-picker-range :start.sync="query.start" :end.sync="query.end" />
      </gz-group-item>
      <gz-group-item label="默认">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </gz-group-item>
    </gz-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          start: "",
          end: ""
        },
        value1: []
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
