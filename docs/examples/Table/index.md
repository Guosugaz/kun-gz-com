## Table

> 封装了[ElTable](https://element-plus.org/zh-CN/component/table.html)，更好的复用表格，嵌套了分页直接上手

### 示例

:::code Table/index.vue
:::

### Table props

基本都复用了[ElTable](http://element-plus.org/zh-CN/component/table.html)的 props，已下是新增的 props

| 参数       | 说明                                                                                                               | 类型       | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ------ | ------ |
| columns    | 列表的数组                                                                                                         | Columns[]  |        | []     |
| loading    | 列表的 loading                                                                                                     | boolean    |        | false  |
| fn         | 列表数据请求函数                                                                                                   | Function   |        |        |
| query      | 条件筛选对象，支持 sync 在分页时自动修改，需包含三两个 key，`current`、`size`，这两个 key 可以在`pagination`里设置 | Object     |        |        |
| pagination | 分页组件的 props                                                                                                   | Pagination |        |        |

### Pagination props

基本都复用了[ElPagination](http://element-plus.org/zh-CN/component/pagination.html)的 props，已下是新增的 props

| 参数       | 说明                 | 类型  | 可选值 | 默认值  |
| ---------- | -------------------- | ----- | ------ | ------- |
| currentKey | 当前页的 cuurent key | sting |        | current |
| sizeKey    | 每页的 size key      | sting |        | size    |
| totalKey   | 总共的 total key     | sting |        | total   |

### Method

| 方法 | 说明         | 参数      |
| ---- | ------------ | --------- |
| run  | 调用请求函数 | page 页数 |

### Event

| 事件名称      | 说明       | 类型 |
| ------------- | ---------- | -------- |
| sizeChange    | page-size 改变时触发   | (value: number) => void     |
| currentChange | current-page 改变时触发 | (value: number) => void  |
