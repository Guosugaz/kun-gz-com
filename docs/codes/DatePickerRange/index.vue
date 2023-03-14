<template>
  <gz-group labelWidth="80px" grid="3">
    <gz-group-item label="默认">
      <gz-date-picker v-model:start="query.start1" v-model:end="query.end1" />
    </gz-group-item>
    <gz-group-item label="结果">
      {{ query.start1 }} - {{ query.end1 }}
    </gz-group-item>
    <gz-group-item label="限制30天">
      <gz-date-picker
        v-model:start="query.start2"
        v-model:end="query.end2"
        :disabled-date="limtMonth"
      />
    </gz-group-item>
    <gz-group-item label="结果">
      {{ query.start2 }} - {{ query.end2 }}
    </gz-group-item>
  </gz-group>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import dayjs from "dayjs";
  import minMax from "dayjs/plugin/minMax";
  dayjs.extend(minMax);

  const query = reactive({
    start1: "2022-01-02",
    end1: "2022-01-22",
    start2: "",
    end2: ""
  });
  function limtMonth(val: Date, choose: Date | null) {
    if (!choose) return false;
    const max = dayjs(choose).add(30, "d");
    const min = dayjs(choose).subtract(30, "d");
    const time = dayjs(val);
    return dayjs.max(max, time) === time || dayjs.min(min, time) === time;
  }
</script>
