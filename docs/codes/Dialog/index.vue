<template>
  <ClientOnly>
    <gz-group labelWidth="80px" grid="3">
      <gz-group-item label="默认">
        <el-button @click="show = true">新增角色</el-button>
      </gz-group-item>
    </gz-group>
    <gz-dialog
      v-model="show"
      title="新增角色"
      :width="form.width"
      :showFullscreen="form.showFullscreen"
      :top="form.top"
      :refresh="queryDetail"
    >
      <el-form v-loading="loading" :model="form" label-width="80px">
        <el-form-item label="宽度">
          <el-radio-group v-model="form.width">
            <el-radio label="700px">700px</el-radio>
            <el-radio label="600px">600px(默认)</el-radio>
            <el-radio label="500px">500px</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无全屏">
          <el-switch v-model="form.showFullscreen" />
        </el-form-item>
        <el-form-item label="顶部距离">
          <el-radio-group v-model="form.top">
            <el-radio :label="undefined">居中</el-radio>
            <el-radio label="10vh">10vh</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="20" placeholder="请输入内容" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </template>
    </gz-dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { reactive, ref } from "vue";

  const show = ref(false);
  const loading = ref(false);
  const form = reactive({
    width: "600px",
    showFullscreen: true,
    top: undefined
  });

  function queryDetail() {
    if (loading.value) return;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function onSubmit() {}
</script>
