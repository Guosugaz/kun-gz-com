import { isDef, throttle } from "@sugaz/gz-com/lib/utils/index.js";
const bem = "gz-group";

export default {
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
  data() {
    return { mapGrid: null };
  },
  computed: {
    wrapClass() {
      return `${bem} ${bem}_${this.mapGrid}`;
    }
  },
  watch: {
    grid: {
      handler(val) {
        this.$emit("unObserver");
        if (val) {
          this.handleGrid();
        } else {
          this.registerAutoGrid();
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (!isDef(this.grid)) {
      this.registerAutoGrid();
    }
  },
  beforeDestroy() {
    this.$emit("unObserver");
  },
  methods: {
    registerAutoGrid() {
      const wrap = this.$refs.groupWarp;
      // 不兼容就不监听
      if (!ResizeObserver || !isDef(wrap)) {
        return this.handleGrid();
      }
      let fun = throttle(
        () => {
          this.handleGrid();
        },
        300,
        true
      );
      const observer = new ResizeObserver(fun);

      observer.observe(wrap);
      this.$on("unObserver", () => {
        observer.unobserve(wrap);
        fun = null;
      });
    },
    handleGrid() {
      // 自动时适应根据块的宽度判断设置grid
      const width = this.$refs.groupWarp?.offsetWidth;
      if (!this.grid) {
        if (!isDef(width)) {
          this.mapGrid = 4;
        } else if (width >= 1600) {
          this.mapGrid = 7;
        } else if (width < 1600 && width >= 1000) {
          this.mapGrid = 5;
        } else if (width < 1000 && width >= 800) {
          this.mapGrid = 4;
        } else if (width < 800 && width >= 600) {
          this.mapGrid = 3;
        } else if (width < 600 && width >= 400) {
          this.mapGrid = 2;
        } else {
          this.mapGrid = 1;
        }
      } else {
        this.mapGrid = this.grid;
      }
      this.$emit("change-grid", {
        wrapWidth: width,
        grid: this.mapGrid
      });
    }
  },
  render(h) {
    return h(
      "div",
      {
        ref: "groupWarp",
        class: this.wrapClass
      },
      [this.$slots.default]
    );
  }
};
