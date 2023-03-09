<template>
  <div class="log">
    <a-timeline reverse>
      <a-timeline-item color="#165dff">2023/1/31 下午4:07:21 发布了 1.0.8 版本 支持注册使用 Button 和 Link 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/1 下午9:12:10 发布了 1.0.9 版本 支持全局导入组件库和 Icon 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/2 下午10:17:53 发布了 1.0.10 版本 支持 Modal 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/3 下午10:31:11 发布了 1.0.11 版本 支持 Progress 和 BreadCrumb 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/4 下午9:21:07 发布了 1.0.12 版本 支持 Modal 、 Spin 、 Result 、Upload组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/5 下午8:11:01 发布了 1.0.14 版本 支持 DropDwon 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/6 下午9:57:33 发布了 1.0.15 版本 支持 Menu 组件，修复 Modal 和 Progress 组件的图标问题</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/7 下午10:16:43 发布了 1.0.16 版本 支持 Layout 、BackTop 和 Card 组件</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/8 下午10:01:22 发布了 1.0.18 版本 支持 Drawer 和 Alert 组件，修复了 SSR 环境下图标引入失败的问题</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/9 下午9:46:58 发布了 1.0.22 版本 支持 Switch 组件，修复了样式冲突问题</a-timeline-item>
      <a-timeline-item color="#165dff">2023/2/9 下午7:55:27 发布了 1.1.1 版本 支持 Table 组件，修复了 DropDwon 组件 hover 问题，Switch 组件样式错乱问题</a-timeline-item>

    </a-timeline>
  </div>
</template>

<script>
import 'ant-design-vue/lib/timeline/style/index.css';
</script>

<style scoped>
.log {
  margin-top: 50px;
}

.log::v-deep(.ant-timeline-item-content) {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 20px;
}

.dark .log::v-deep(.ant-timeline-item-tail) {
  border-left-color: #4d4a4a;
}

.dark .log::v-deep(.ant-timeline-item-content) {
  color: rgba(255, 255, 245, 0.86);
  box-shadow: 0 2px 12px 0 rgb(255 255 255 / 10%);
}
</style>