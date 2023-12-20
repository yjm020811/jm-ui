<template>
  <div>
    <!-- svg的测试 -->
    <svg :style="{ width, height }">
      <!-- xlink:href执行哪一个图标，属性值务必#icon-图标名字 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  // icon的前缀
  prefix: {
    type: String,
    default: "#icon-"
  },
  // icon的名字
  name: {
    type: String,
    required: true
  },
  // icon的宽
  width: {
    type: String,
    default: "2em"
  },
  // icon的高
  height: {
    type: String,
    default: "2em"
  },
  //icon的颜色
  color: {
    type: String
  }
});
</script>
<style scoped>
svg {
  width: 2em;
  height: 2em;
}
</style>
