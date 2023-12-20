<template>
  <h3>这是element-plus的icon</h3>
  <el-icon-menu class="elementPlusIcon"></el-icon-menu>
  <h3 style="margin-top: 20px">这是自己封装的svgIcon组件</h3>
  <svgIcon name="vue" width="100px" height="100px"></svgIcon>
  <svgIcon name="computer" color="red"></svgIcon>
  <svgIcon name="json" color="red"></svgIcon>
</template>
<script setup></script>
<style scoped>
.elementPlusIcon {
  width: 2em;
  height: 2em;
}
</style>
