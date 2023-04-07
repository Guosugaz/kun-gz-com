<template>
  <div :class="`${bem} ${bem}_${spanClass} ${customClass}`">
    <div :class="`${bem}_label`" :style="{ width: labelWidth }">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div :class="`${bem}_content ${bem}_content_${align}`">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: "GzGroupItem"
  });
</script>
<script setup lang="ts">
  import { computed, defineComponent, inject, ref } from "vue";
  import { groupItemProps } from "./group-item-props";
  import { defaultOptions } from "@core/config-provider";
  import { useGlobalConfig } from "@core/hooks";

  const bem = ref("gz-group-item");
  const GzGroup = inject("GzGroup", {
    labelWidth: defaultOptions.group.labelWidth
  });
  const props = defineProps(groupItemProps);
  const config = useGlobalConfig();

  const spanClass = computed(() => {
    const [num, after] = String(props.span).split(".");
    return after ? `${num}-5` : props.span;
  });

  const labelWidth = computed(() => {
    return props.width || config.value.group.labelWidth || GzGroup.labelWidth;
  });
</script>

<style lang="scss" scoped></style>
