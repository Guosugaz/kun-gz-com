## Table

> 封装了[ElTable](https://element.eleme.cn/#/zh-CN/component/table)，更好的复用表格，嵌套了分页直接上手

### 单独引入

```js
import Vue from "vue";
import GZCOM from "@sugaz/gz-com/lib/GZCOM";
import Table from "@sugaz/gz-com/lib/table";

Vue.use(GZCOM).use(Table);
```

### 示例

:::demo

```html
<template>
  <gz-table
    :loading="loading"
    :data="tableData.records"
    :columns="columns"
    :page="tableData"
    :query.sync="query"
    size="small"
    align="center"
    showOverflowTooltip
    :pagination="pagination"
    @update="getList"
  >
    <template #created_at="{ row }">
      <i class="el-icon-time" />
      <span>{{ row.display_time }}</span>
    </template>
  </gz-table>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        columns: [
          { label: "ID", width: 50, type: "index" },
          { label: "Title", prop: "title" },
          { label: "Author", prop: "author", width: "110" },
          { label: "Pageviews", prop: "pageviews", width: "110" },
          {
            label: "More",
            // 多级表头
            children: [
              {
                label: "Status",
                width: "110",
                template(h, { row: { status } }) {
                  return (
                    <el-tag type={status ? "success" : "warning"}>
                      {status ? "正常" : "冻结"}
                    </el-tag>
                  );
                }
              },
              { label: "Time", slot: "created_at", width: "200" }
            ]
          }
        ],
        pagination: {
          layout: "total, sizes, prev, pager, next, jumper",
          pageSizes: [10, 50, 100]
        },
        tableData: {},
        query: {
          size: 10,
          current: 1
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.loading = true;
        setTimeout(() => {
          this.tableData = this.$Mock.mock({
            [`records|${this.query.size}`]: [
              {
                id: "@id",
                title: "@title",
                author: "@name",
                pageviews: "@last",
                "status|0-1": 1,
                display_time: "@date"
              }
            ],
            total: 400,
            current: this.query.current,
            size: this.query.size
          });
          this.loading = false;
        }, 400);
      }
    }
  };
</script>
```

:::

### Table props

基本都复用了[ElTable](https://element.eleme.cn/#/zh-CN/component/table)的 props，已下是新增的 props

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
| update   | 统一处理分页组件的`size-change`和`current-change`事件 | {[currentKey], [sizeKey]} |
