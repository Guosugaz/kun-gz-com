<template>
  <el-dialog
    v-bind="$attrs"
    v-model="syncModelValue"
    :width="wrapWidth"
    :custom-class="wrapClass"
    :top="mapTop"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="false"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    @close="handleCancel"
  >
    <template #title>
      <div ref="titleRef" :class="`${bem}-title`">
        <div :class="`${bem}-title_left`">{{ title }}</div>
        <div :class="`${bem}-title_right`">
          <!-- 刷新按钮 -->
          <el-icon
            v-if="refresh"
            class="el-icon-refresh-left icon"
            @click="handleRefresh"
          >
            <Refresh />
          </el-icon>
          <!-- 全屏按钮 -->
          <el-icon
            v-if="showFullscreen"
            class="el-icon-close icon"
            @click="handleFullscreen"
          >
            <component :is="isFullscreen ? 'CopyDocument' : 'FullScreen'" />
          </el-icon>
          <!-- 关闭按钮 -->
          <el-icon
            v-if="showClose"
            class="el-icon-close icon"
            @click="syncModelValue = false"
          >
            <Close />
          </el-icon>
        </div>
      </div>
    </template>

    <div :style="bodyStyle" :class="`${bem}-body`">
      <slot />
    </div>
    <template #footer>
      <div v-if="$slots.footer" ref="footer" :class="`${bem}-footer`">
        <slot name="footer" />
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  /**
   * @description: 封装一下 el-dialog
   * @see https://element-plus.gitee.io/zh-CN/component/dialog.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95
   */
  import { isDef } from "@core/utils";
  import { defineComponent } from "vue";
  import {
    Close,
    Refresh,
    CopyDocument,
    FullScreen
  } from "@element-plus/icons-vue";

  const bem = "gz-dialog";

  export default defineComponent({
    name: "GzDialog",
    components: {
      Close,
      Refresh,
      CopyDocument,
      FullScreen
    },
    // inheritAttrs: false,
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: "600px"
      },
      // 距离顶部的高度，不设置就默认居中
      top: {
        type: String,
        default: undefined
      },
      title: {
        type: String,
        default: ""
      },
      // 是否有刷新按钮
      refresh: {
        type: Function,
        default: null
      },
      // 是否有全屏
      showFullscreen: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    emits: ["update:modelValue", "close"],
    data() {
      return {
        isFullscreen: false,
        bem
      };
    },
    computed: {
      syncModelValue: {
        get() {
          return this.modelValue;
        },
        set(val: boolean) {
          this.$emit("update:modelValue", val);
        }
      },
      bodyStyle() {
        if (this.isFullscreen) {
          let footerHieght = 0;
          let titleHieght = 0;
          if (this.$slots?.footer) {
            footerHieght =
              (this.$refs.footer as HTMLElement)?.offsetHeight || 0;
          }
          titleHieght = (this.$refs.titleRef as HTMLElement)?.offsetHeight || 0;
          return {
            height: `calc(100vh - ${titleHieght}px - ${footerHieght}px)`
          };
        } else {
          return { "max-height": "70vh" };
        }
      },
      // 容器的宽度
      wrapWidth() {
        if (this.isFullscreen) return "100%";
        return this.width;
      },
      wrapClass() {
        let wrapClass = bem;
        if (this.isFullscreen) return `${wrapClass} ${bem}_fullscreen`;
        // 没设置高度就默认居中
        if (!isDef(this.top)) wrapClass = `${wrapClass} ${bem}_middle`;
        return wrapClass;
      },
      mapTop() {
        return isDef(this.top) ? this.top : "0";
      }
    },
    watch: {
      modelValue(val) {
        if (!val && this.isFullscreen) {
          setTimeout(() => {
            this.isFullscreen = false;
          }, 300);
        }
      }
    },
    methods: {
      handleCancel() {
        this.$emit("close");
        this.syncModelValue = false;
      },
      // 点击刷新
      handleRefresh() {
        if (this.refresh && typeof this.refresh === "function") {
          this.refresh();
        }
      },
      // 点击全屏
      handleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
      }
    }
  });
</script>
