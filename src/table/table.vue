<template>
  <tableWrap />
</template>

<script lang="tsx">
  export default defineComponent({
    name: "GzTable"
  });
</script>
<script setup lang="tsx">
  import {
    computed,
    defineComponent,
    h,
    ref,
    resolveComponent,
    useAttrs,
    useSlots
  } from "vue";
  //   import { isDef } from "@core/utils";
  import { useVModels } from "@vueuse/core";
  import { Column, tableProps } from "./table.props";
  import { useGlobalConfig } from "@core/hooks/use-global-config";

  const props = defineProps(tableProps);
  const emit = defineEmits<{
    (e: "update:query", val: Record<string, any>): void;
    (e: "currentChange", val: number): void;
    (e: "sizeChange", val: number): void;
  }>();
  defineExpose({ run, triggerTableMethod });
  const loading = ref(false);
  const tableRef = ref<any>(null);
  const tableData = ref<any[]>([]);
  const slots = useSlots();
  const attrs = useAttrs();
  const { query: syncedQuery } = useVModels(props, emit);
  const config = useGlobalConfig();

  const pagnationProps = computed(() => {
    const temp: any = Object.assign(
      {},
      config.value.pagination,
      props.pagination,
      {
        pageSize: syncedQuery.value[props.pagination.sizeKey],
        currentPage: syncedQuery.value[props.pagination.currentKey]
      }
    );
    temp.total = props.total || syncedQuery.value[temp.totalKey!];
    return temp;
  });

  async function run(page: 1) {
    if (props.fn) {
      syncedQuery.value[pagnationProps.value.currentKey!] = page;
      loading.value = true;
      try {
        tableData.value = await props.fn();
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
  }

  function triggerTableMethod(method: string, ...args: any[]) {
    if (tableRef.value) {
      tableRef.value[method] && tableRef.value[method](args);
    }
  }

  function rednerColumn(columns?: Column[]): any {
    if (!columns) return null;
    return columns.map((item) => {
      let slot: any = {};
      if (item.template) {
        slot.default = (slotArgs: any) => item.template!(slotArgs);
      } else if (item.slot && slots[item.slot]) {
        slot.default = (slotArgs: any) => slots[item.slot!]!(slotArgs);
      } else {
        slot = [rednerColumn(item.children)];
      }
      return h(resolveComponent("el-table-column"), { ...item }, slot);
    });
  }

  function paginationChange(val: number, type: 1 | 2) {
    const { currentKey, sizeKey } = pagnationProps.value;
    const key = type === 1 ? currentKey : sizeKey;
    syncedQuery.value[key!] = val;
    emit(type === 1 ? "currentChange" : ("sizeChange" as any), val);
  }

  function tableWrap() {
    return h(
      "div",
      {
        directives: [{ name: "loading", value: props.loading || loading.value }]
      },
      [
        h(
          resolveComponent("el-table"),
          {
            ref: "tableRef",
            ...attrs,
            data: tableData.value
          },
          [rednerColumn(props.columns), slots.default && slots.default()]
        ),
        h(resolveComponent("el-pagination"), {
          class: "gz-table_pagination",
          ...pagnationProps.value,
          "onUpdate:current-page": (current: number) =>
            paginationChange(current, 1),
          "onUpdate:page-size": (size: number) => paginationChange(size, 2)
        })
      ]
    );
  }
</script>

<style scoped></style>
