import { defineComponent } from "vue";

const bem = "gz-group-item";

export default defineComponent({
  name: "GzGroupItem",
  props: {
    span: {
      type: [String, Number],
      default: "1"
    },
    label: {
      type: String,
      require: true,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "left"
    }
  },
  computed: {
    parentLabelWidth() {
      let parent: any = this.$parent;
      let parentName = parent.$options.componentName;
      while (parent.$options && parentName !== "GzGroup") {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent ? parent.labelWidth : "90px";
    },
    spanClass() {
      const [num, after] = String(this.span).split(".");
      return after ? `${num}-5` : this.span;
    }
  },
  render(h: any) {
    const { label, customClass, parentLabelWidth, spanClass, align } = this;
    const width = this.width || parentLabelWidth;
    const labelWarp = () => {
      const wrap = this.$slots.label || label;
      if (wrap) {
        return h("span", { class: `${bem}_label`, style: { width } }, wrap);
      }
      return null;
    };
    return h(
      "div",
      {
        class: `${bem} ${bem}_${spanClass} ${customClass}`
      },
      [
        labelWarp(),
        h(
          "span",
          { class: `${bem}_content ${bem}_content_${align}` },
          this.$slots.default
        )
      ]
    );
  }
});
