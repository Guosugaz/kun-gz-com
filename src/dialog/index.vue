<template>
  <el-dialog
    v-bind="$attrs"
    :visible="show"
    :width="wrapWidth"
    :custom-class="wrapClass"
    :top="mapTop"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="false"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    @close="handleCancel"
  >
    <div slot="title" :class="`${bem}-title`">
      {{ title }}
      <div>
        <!-- 刷新按钮 -->
        <i
          v-if="refresh"
          class="el-icon-refresh-left icon"
          @click="handleRefresh"
        />
        <!-- 全屏按钮 -->
        <i
          v-if="showFullscreen"
          :class="`el-icon-${
            isFullscreen ? 'copy-document' : 'full-screen'
          } icon`"
          @click="handleFullscreen"
        />
        <!-- 关闭按钮 -->
        <i
          v-if="showClose"
          class="el-icon-close icon"
          @click="$emit('update:show', false)"
        />
      </div>
    </div>
    <div :style="bodyStyle" :class="`${bem}-body`">
      <slot />
    </div>
    <div slot="footer" class="dialog-footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
  /**
   * @description: 封装一下 el-dialog
   * @see https://element.eleme.cn/#/zh-CN/component/dialog
   */
  import variables from "@/theme-default/common/variables.scss";
  import { isDef } from "@sugaz/gz-com/lib/utils/index.js";

  const bem = "gz-dialog";
  const widthList = variables.dialogWidthTypes.split(",");

  export default {
    name: "GzDialog",
    inheritAttrs: false,
    props: {
      show: {
        type: Boolean,
        default: false
      },
      // 可选 normal large，small 或者普通的单位 500px
      width: {
        type: String,
        default: "normal"
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
    data() {
      return {
        isFullscreen: false,
        bem
      };
    },
    computed: {
      bodyStyle() {
        if (this.isFullscreen) {
          return { height: "calc(100vh - 49px - 66px)" };
        } else {
          return { "max-height": "70vh" };
        }
      },
      // 容器的宽度
      wrapWidth() {
        if (this.isFullscreen) return "100vw";

        const index = widthList.indexOf(this.width);
        const widthRange = variables.dialogWidthRange.split(",");
        if (index > -1) return widthRange[index];
        return this.width;
      },
      wrapClass() {
        let wrapClass = bem;
        if (this.isFullscreen) return `${wrapClass} ${bem}_fullscreen`;
        // 没设置高度就默认居中
        if (!isDef(this.top)) wrapClass = `${wrapClass} ${bem}_middle`;
        return widthList.reduce((pre, key) => {
          if (this.width === key) {
            pre += ` ${bem}_${key}`;
          }
          return pre;
        }, wrapClass);
      },
      mapTop() {
        return isDef(this.top) ? this.top : "0";
      }
    },
    watch: {
      show(val) {
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
        this.$emit("update:show", false);
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
  };
</script>
