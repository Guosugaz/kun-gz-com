import { isDef } from "@core/utils";
import { Subject } from "rxjs";
import { throttleTime } from "rxjs/internal/operators/throttleTime";
import { computed, defineComponent, onMounted, ref, watch, h } from "vue";
const bem = "gz-group";

export default defineComponent({
  name: "GzGroup",
  componentName: "GzGroup",
  props: {
    grid: {
      type: [Number, String],
      default: null
    },
    labelWidth: {
      type: String,
      default: "90px"
    }
  },
  setup({ props, $slots, $refs, $emit }) {
    const mapGrid = ref(4);
    const sub = new Subject<void>();
    const observer = ref<ResizeObserver>(null as any);

    const wrapClass = computed(() => {
      return `${bem} ${bem}_${mapGrid.value}`;
    });

    watch(
      props.grid,
      (val) => {
        unObserver();
        if (val) {
          handleGrid();
        } else {
          registerAutoGrid();
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      if (!isDef(props.grid)) {
        registerAutoGrid();
      }
    });

    function registerAutoGrid() {
      const wrap = $refs.groupWarp;
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
      const width = $refs.groupWarp?.offsetWidth;
      if (!props.grid) {
        if (!isDef(width)) {
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
        mapGrid.value = props.grid;
      }
      $emit("change-grid", {
        wrapWidth: width,
        grid: mapGrid
      });
    }
    function unObserver() {
      observer.value.unobserve($refs.groupWarp);
      observer.value = null as any;
    }

    return h(
      "div",
      {
        ref: "groupWarp",
        class: wrapClass.value
      },
      [$slots.default]
    );
  }
});
