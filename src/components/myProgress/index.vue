<template>
  <div>
    <el-progress  v-bind="$attrs" :percentage="p"></el-progress>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const p = ref(0);
onMounted(() => {
  if (props.isAnimation) {
    //规定时间内加载完成
    const t = Math.ceil(props.time / props.percentage);
    const timer = setInterval(() => {
      p.value = p.value + 10;
      if (p.value >= props.percentage) {
        p.value = props.percentage;
        clearInterval(timer);
      }
    }, t);
  }else {
    p.value = props.percentage;
  }
});

const props = defineProps({
  //进度条进度
  percentage: {
    type: Number,
    default: 0
  },
  //进度条是否有动画效果
  isAnimation: {
    type: Boolean,
    default: false
  },
  //动画时长
  time: {
    type: Number,
    default: 3000
  }
});
</script>
<style scoped></style>
