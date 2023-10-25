<template>
  <div>
    <proGress
      :percentage="30"
      isAnimation
      :time="3000"
      :stroke-width="15"
    ></proGress>

    <proGress
      :percentage="30"
      isAnimation
      :time="3000"
      :stroke-width="15"
      type="circle"
    ></proGress>
  </div>
</template>

<script setup>
import { ref } from "vue";

import proGress from "../../components/progress/index.vue";
</script>
<style scoped>
:deep(.el-progress-circle){
  svg{
    width: 126px !important;
    height: 126px !important;
  }
}
</style>
