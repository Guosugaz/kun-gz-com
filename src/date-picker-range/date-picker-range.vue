<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="around"
    :format="format"
    :value-format="valueFormat"
    :type="type"
  />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { isDef } from "@core/utils";
  import { useVModels } from "@vueuse/core";

  type Value = number | string | null;

  const props = withDefaults(
    defineProps<{
      type?: string;
      start: Value;
      end: Value;
      format?: string;
      valueFormat?: string;
    }>(),
    {
      type: "daterange",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd"
    }
  );
  const emit = defineEmits<{
    (e: "update:start", val: string): void;
    (e: "update:end", val: string): void;
    (e: "change", val: Value[]): void;
  }>();
  const { start, end } = useVModels(props, emit);

  const dv = computed(() => {
    if (typeof start.value === "number" || !isDef(start.value)) {
      return null;
    }
    return "";
  });
  const around = computed({
    get() {
      const s = start.value || dv.value;
      const e = end.value || dv.value;
      if (s && !e) {
        return [s];
      } else if (!s && e) {
        return [null, e];
      } else if (!s && !e) {
        return [];
      }
      return [s, e];
    },
    set(val) {
      val = val || [];
      start.value = val[0] || dv.value;
      end.value = val[1] || dv.value;
      emit("change", val);
    }
  });
</script>
