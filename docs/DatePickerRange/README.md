## DatePickerRange

> <strong>日期范围</strong>再封装，主要是支持直接修改对象的值，不用再声明数组来取值，还加入了时间的限制

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
        <gz-date-picker-range
          :start.sync="query.start1"
          :end.sync="query.end1"
        />
      </gz-group-item>
      <gz-group-item label="结果">
        {{query.start1}} - {{query.end1}}
      </gz-group-item>
      <gz-group-item label="限制30天">
        <gz-date-picker-range
          :start.sync="query.start2"
          :end.sync="query.end2"
          :range="30"
        />
      </gz-group-item>
      <gz-group-item label="结果">
        {{query.start2}} - {{query.end2}}
      </gz-group-item>
    </gz-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          start1: "2022-01-02",
          end1: "2022-01-22",
          start2: "",
          end2: ""
        }
      };
    }
  };
</script>
```

:::

### props

支持全部的 [日期范围](https://element.eleme.cn/#/zh-CN/component/date-picker) props

| 参数  | 说明                           | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------ | ------ | ------ | ------ |
| range | 限制开始到结束的时间，单位为日 | number |        |        |
