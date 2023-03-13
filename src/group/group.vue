<!--
 * @Description: 
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2023-02-19 20:13:15
 * @LastEditTime: 2023-03-13 13:53:19
-->
<template>
  <div :id="id" :class="wrapClass">
    <slot />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: "GzGroup"
  });
</script>
<script setup lang="ts">
  import { isDef } from "@core/utils";
  import { Subject, throttleTime } from "rxjs";
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    provide,
    reactive,
    ref,
    toRef,
    toRefs,
    watch
  } from "vue";
  import { groupProps } from "./group-props";

  const bem = "gz-group";
  const id = ref(bem + +new Date());

  const props = defineProps(groupProps);
  const emit = defineEmits<{
    (
      e: "change-grid",
      data: {
        wrapWidth?: number;
        grid: number;
      }
    ): void;
  }>();
  const mapGrid = ref(4);
  const sub = new Subject<void>();
  const observer = ref<ResizeObserver>(null as any);

  const wrapClass = computed(() => {
    return `${bem} ${bem}_${mapGrid.value}`;
  });

  provide(
    "GzGroup",
    reactive({
      ...toRefs(props)
    })
  );

  watch(
    toRef(props, "grid"),
    (val) => {
      nextTick(() => {
        unObserver();
        if (val) {
          handleGrid();
        } else {
          registerAutoGrid();
        }
      });
    },
    { immediate: true }
  );

  onMounted(() => {
    if (!isDef(props.grid)) {
      registerAutoGrid();
    }
  });

  function registerAutoGrid() {
    const wrap = document.querySelector(`#${id.value}`)!;
    // 不兼容就不监听
    if (!ResizeObserver || !isDef(wrap)) {
      return handleGrid();
    }
    sub.pipe(throttleTime(300)).subscribe(handleGrid);
    observer.value = new ResizeObserver(() => sub.next());
    observer.value.observe(wrap);
  }

  function handleGrid() {
    // 自动时适应根据块的宽度判断设置grid
    const width = document.querySelector<HTMLElement>(
      `#${id.value}`
    )?.offsetWidth;
    if (!props.grid) {
      if (!width) {
        mapGrid.value = 4;
      } else if (width >= 1600) {
        mapGrid.value = 7;
      } else if (width < 1600 && width >= 1000) {
        mapGrid.value = 5;
      } else if (width < 1000 && width >= 800) {
        mapGrid.value = 4;
      } else if (width < 800 && width >= 600) {
        mapGrid.value = 3;
      } else if (width < 600 && width >= 400) {
        mapGrid.value = 2;
      } else {
        mapGrid.value = 1;
      }
    } else {
      mapGrid.value = Number(props.grid);
    }
    emit("change-grid", {
      wrapWidth: width,
      grid: mapGrid.value
    });
  }
  function unObserver() {
    if (!observer.value) return;
    observer.value.unobserve(document.querySelector("#gzGroupWarp")!);
    observer.value = null as any;
  }
</script>

<style></style>
