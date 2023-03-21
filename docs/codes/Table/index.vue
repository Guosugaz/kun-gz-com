<template>
  <gz-table
    ref="gzTableRef"
    v-model:query="query"
    :columns="columns"
    :fn="queryList"
    :pagination="pagination"
  >
    <template #created_at="{ row }">
      <i class="el-icon-time" />
      <span>{{ row.display_time }}</span>
    </template>
  </gz-table>
</template>

<script lang="tsx" setup>
  import type {
    GzPaginationProps,
    Column
  } from "../../../src/table/table.props";
  import { onMounted, reactive, ref } from "vue";
  import { mock } from "mockjs";

  const gzTableRef = ref<any>(null);
  const columns = reactive<Column[]>([
    { label: "ID", width: 50, type: "index" },
    { label: "Title", prop: "title" },
    { label: "Author", prop: "author" },
    { label: "Pageviews", prop: "pageviews" },
    {
      label: "More",
      // 多级表头
      children: [
        {
          label: "Status",
          width: "110",
          template({ row: { status } }) {
            return (
              <el-tag type={status ? "success" : "warning"}>
                {status ? "正常" : "冻结"}
              </el-tag>
            );
          }
        },
        { label: "Time", slot: "created_at", width: "200" }
      ]
    },
  ]);
  const query = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0
  });
  const pagination = reactive<GzPaginationProps>({
    currentKey: "pageNum",
    sizeKey: "pageSize"
  });

  onMounted(() => {
    gzTableRef.value.run();
  });

  async function queryList() {
    const data = mock({
      [`records|${query.pageSize}`]: [
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
      current: query.pageNum,
      size: query.pageSize
    });
    query.total = data.total;
    return data.records;
  }
</script>
