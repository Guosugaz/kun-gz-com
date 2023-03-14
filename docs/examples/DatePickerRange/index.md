## DatePickerRange

> <strong>日期范围</strong>再封装，主要是支持直接修改对象的值，不用再声明数组来取值，还加入了时间的限制

### 单独引入

```js
import Vue from "vue";
import DatePickerRange from "@sugaz/gz-com/lib/date-picker-range";

Vue.use(DatePickerRange);
```

### 示例

:::code DatePickerRange/index.vue
:::

### props

支持全部的 [日期范围](https://element.eleme.cn/#/zh-CN/component/date-picker) props

| 参数  | 说明                           | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------ | ------ | ------ | ------ |
| range | 限制开始到结束的时间，单位为日 | number |        |        |
