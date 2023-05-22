<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="around"
    :format="format"
    :value-format="valueFormat"
    :type="type"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :disabled-date="hadnleDisabledDate"
    @focus="handleFocus"
    @calendar-change="handleCalendarChange"
  >
    <slot name="range-separator" />
    <slot />
  </el-date-picker>
</template>

<script lang="ts">
  export default defineComponent({
    name: "GzDatePicker"
  });
</script>
<script setup lang="ts">
  import { computed, defineComponent, ref, watch } from "vue";
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
      disabledDate?: (val: Date, choose: Date | null) => void;
    }>(),
    {
      type: "daterange",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD"
    }
  );
  const emit = defineEmits<{
    (e: "update:start", val: string): void;
    (e: "update:end", val: string): void;
    (e: "change", val: Value[]): void;
    (e: "focus"): void;
    (e: "calendarChange", val: any[]): void;
  }>();
  const { start, end } = useVModels(props, emit);
  const chooseVal = ref<Date | null>(null);

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

  watch(start, (val) => {
    if (!val) chooseVal.value = null;
  })

  function handleFocus() {
    chooseVal.value = null;
    emit("focus");
  }

  function handleCalendarChange(val: Date[]) {
    const [pointDay] = val;
    chooseVal.value = pointDay;
    emit("calendarChange", val);
  }

  function hadnleDisabledDate(val: any) {
    if (props.disabledDate) {
      return props.disabledDate(val, chooseVal.value);
    }
    return false;
  }
</script>
