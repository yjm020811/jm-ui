<template>
  <h3>这是element-plus的icon</h3>
  <el-icon-menu class="elementPlusIcon"></el-icon-menu>
  <h3 style="margin-top: 20px">这是自己封装的svgIcon组件</h3>
  <svgIcon name="vue" width="100px" height="100px"></svgIcon>
  <svgIcon name="computer" color="red"></svgIcon>
  <svgIcon name="json" color="red"></svgIcon>
  <div id="render"></div>
</template>
<script setup>
import { h, createApp, onMounted } from "vue";

const MyComponent = () => {
  return h("div", "我是render函数渲染的内容");
};
const app = createApp({
  render() {
    return h(MyComponent);
  }
});

// 渲染到DOM
onMounted(() => {
  const container = document.getElementById("render");
  console.log(container); // 应该打印 DOM 元素
  app.mount(container);
});
</script>

<style scoped>
.elementPlusIcon {
  width: 2em;
  height: 2em;
}
</style>
