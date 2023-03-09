<template>
  <section class="codeBox">
    <div class="container">
      <component :is="component"></component>
    </div>
    <div class="operation">
      <button :data-tip="tip" :class="{ open: open }" @click="open = !open">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-code"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          data-v-1bd552f0=""
        >
          <path
            d="M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453"
          ></path>
        </svg>
      </button>
      <button :data-tip="copyTip" @click="copy">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-copy"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          data-v-1bd552f0=""
        >
          <path
            d="M20 6h18a2 2 0 0 1 2 2v22M8 16v24c0 1.105.891 2 1.996 2h20.007A1.99 1.99 0 0 0 32 40.008V15.997A1.997 1.997 0 0 0 30 14H10a2 2 0 0 0-2 2Z"
          ></path>
        </svg>
      </button>
    </div>
    <collapse-transition>
      <div
        v-show="open"
        :class="{ sourceCode: true, open: open }"
        v-html="source"
      ></div>
    </collapse-transition>
  </section>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from "vue";
const modules = import.meta.glob("../../codes/**/*.vue");
const props = defineProps({
  source: {
    type: String,
    require: true,
  },
  rawSource: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
});

let open = ref(false);
const tip = computed(() => `${open.value ? "收起" : "展开"}代码`);
let copyTip = ref("复制代码");
const decode = (str) => decodeURIComponent(str);
const source = decode(props.source);
console.log(modules, `../../codes/${props.path}`, modules[`../../codes/${props.path}`]);
const component = props.path ? defineAsyncComponent(modules[`../../codes/${props.path}`]) : null;

const copy = () => {
  navigator.clipboard.writeText(decode(props.rawSource));
  copyTip.value = "复制成功";
  let timer = null;
  setTimeout(() => {
    copyTip.value = "复制代码";
    clearTimeout(timer);
  }, 2000);
};
</script>

<script>
import collapseTransition from "./CollapseTransition.vue";
export default {
  components: {
    collapseTransition,
  },
};
</script>

<style scoped>
.codeBox {
  --container-border-color: 60, 60, 67, 0.12;
  --btn-background-color: 255, 255, 255;
  --btn-open-background-color: 29, 33, 41;
  --btn-border-color: 229, 230, 235;
  --btn-open-border-color: 247, 248, 250;
  --btn-color: 78, 89, 107;
  --btn-open-color: 247, 248, 250;
  --source-code-background-color: 242, 243, 245;
}

html.dark .codeBox {
  --container-border-color: 51, 51, 53;
  --btn-background-color: 49, 49, 50;
  --btn-open-background-color: 246, 246, 246;
  --btn-border-color: 255, 255, 255, 0.12;
  --btn-open-border-color: 23, 23, 26;
  --btn-color: 255, 255, 255, 0.7;
  --btn-open-color: 23, 23, 26;
  --source-code-background-color: 46, 46, 48;
}

.container {
  margin-top: 24px;
  padding: 48px;
  border: 1px solid rgba(var(--container-border-color));
  border-radius: 5px 5px 0 0;
}

.operation {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.operation button {
  position: relative;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 50%;
  margin-left: 8px;
  background-color: rgb(var(--btn-background-color));
  border: 1px solid rgb(var(--btn-border-color));
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--btn-color));
}

.operation button.open {
  color: rgb(var(--btn-open-color));
  background-color: rgb(var(--btn-open-background-color));
  border-color: rgb(var(--btn-open-border-color));
}

.operation button::before {
  content: attr(data-tip);
  display: none;
  position: absolute;
  top: -185%;
  left: -110%;
  color: rgb(235, 234, 235);
  width: 80px;
  height: 35px;
  background-color: rgb(29, 33, 41);
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.operation button::after {
  content: "";
  display: none;
  position: absolute;
  top: -55%;
  left: 15%;
  width: 0;
  height: 0;
  border-width: 6px 8px 6px 8px;
  border-style: solid;
  border-color: rgb(29, 33, 41) transparent transparent transparent;
}

.operation button:hover {
  border-color: rgb(22, 93, 255);
  color: rgb(22, 93, 255);
}

.operation button:hover::before,
.operation button:hover::after {
  display: flex;
}

.operation svg {
  width: 14px;
  height: 14px;
  color: inherit;
}

.sourceCode {
  box-sizing: border-box;
  margin: 0;
  padding: 28px 48px;
  background-color: rgb(var(--source-code-background-color));
  border-radius: 4px;
  overflow: hidden;
  max-height: 600px;
}

.sourceCode.open {
  overflow: scroll;
}

.code-enter-from {
  max-height: 0;
  transform-origin: 50% 50%;
}

.code-enter-active {
  transition: all 2s ease-out;
}

.code-enter-to {
  max-height: 1000px;
}
</style>