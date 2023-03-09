<template>
  <div>
    <gz-group labelWidth="80px" grid="3">
      <gz-group-item span="1">
        <template #label>
          <span>
            名称
            <el-tooltip effect="dark" content="最多4位" placement="top-start">
              tips
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="年龄">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="地址">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="身高">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item label="体重">
        <el-input v-model="form.input" placeholder="请输入内容"></el-input>
      </gz-group-item>
      <gz-group-item align="right">
        <el-button>清空</el-button>
        <el-button type="primary">搜索</el-button>
      </gz-group-item>
    </gz-group>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  const form = reactive({ input: "" });
</script>
