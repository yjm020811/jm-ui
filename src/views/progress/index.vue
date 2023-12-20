<template>
  <div>
    <myProgress
      :percentage="30"
      isAnimation
      :time="3000"
      :stroke-width="15"
    ></myProgress>

    <myProgress
      :percentage="30"
      isAnimation
      :time="3000"
      :stroke-width="15"
      type="circle"
    ></myProgress>
  </div>
</template>

<script setup></script>
<style scoped>
:deep(.el-progress-circle) {
  svg {
    width: 126px !important;
    height: 126px !important;
  }
}
</style>
