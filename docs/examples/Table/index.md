## Table

> 封装了[ElTable](https://element-plus.org/zh-CN/component/table.html)，更好的复用表格，嵌套了分页直接上手

### 示例

:::code Table/index.vue
:::

### Table props

基本都复用了[ElTable](https://element-plus.org/zh-CN/component/table.html)的 props，已下是新增的 props

| 参数                | 说明                                                                                                               | 类型       | 可选值            | 默认值 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ----------------- | ------ |
| columns             | 列表的数组                                                                                                         | Columns[]  |                   | []     |
| loading             | 列表的 loading                                                                                                     | boolean    |                   | false  |
| align               | 统一每列的对齐方式，以 `Colmns` 里的 `align` 为主                                                                  | string     | left/center/right | left   |
| headerAlign         | 统一每列表头的对齐方式，以 `Colmns` 里的 `header-align` 为主                                                       | string     | left/center/right |        |
| showOverflowTooltip | 统一每列内容过长是否隐藏，以 `Colmns` 里的 `show-overflow-tooltip` 为主                                            | boolean    |                   | false  |
| page                | 分页信息对象，需包含三个 key，`current`、`size`、'total'，这三个 key 可以在`pagination`里设置                      | Object     |                   |        |
| query               | 条件筛选对象，支持 sync 在分页时自动修改，需包含三两个 key，`current`、`size`，这两个 key 可以在`pagination`里设置 | Object     |                   |        |
| pagination          | 分页组件的 props                                                                                                   | Pagination |                   |        |

### Pagination props

基本都复用了[ElPagination](https://element.eleme.cn/#/zh-CN/component/pagination)的 props，已下是新增的 props

| 参数       | 说明                 | 类型  | 可选值 | 默认值  |
| ---------- | -------------------- | ----- | ------ | ------- |
| currentKey | 当前页的 cuurent key | sting |        | current |
| sizeKey    | 每页的 size key      | sting |        | size    |
| totalKey   | 总共的 total key     | sting |        | total   |

### Event

| 事件名称 | 说明                                                  | 回调参数                  |
| -------- | ----------------------------------------------------- | ------------------------- |
| update   | 统一处理分页组件的`size-change`和`current-change`事件 | `{[currentKey], [sizeKey]}` |
