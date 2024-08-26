<template>
  <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :router="true">
    <el-menu-item index="/">
      <el-icon-menu></el-icon-menu>
      <span>svg组件</span>
    </el-menu-item>
    <el-menu-item index="/chooseIcon">
      <el-icon-menu></el-icon-menu>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="/chooseArea">
      <el-icon-menu></el-icon-menu>
      <span>省市区三级联动</span>
    </el-menu-item>
    <el-menu-item index="/trend">
      <el-icon-menu></el-icon-menu>
      <span>趋势标记</span>
    </el-menu-item>
    <el-menu-item index="/notification">
      <el-icon-menu></el-icon-menu>
      <span>通知菜单</span>
    </el-menu-item>
    <el-menu-item index="/menus">
      <el-icon-menu></el-icon-menu>
      <span>menu组件</span>
    </el-menu-item>
    <el-menu-item index="/progress">
      <el-icon-menu></el-icon-menu>
      <span>进度条</span>
    </el-menu-item>
    <el-menu-item index="/table">
      <el-icon-menu></el-icon-menu>
      <span>表格组件</span>
    </el-menu-item>
    <el-menu-item index="/form">
      <el-icon-menu></el-icon-menu>
      <span>表单组件</span>
    </el-menu-item>
    <el-menu-item index="/dialog">
      <el-icon-menu></el-icon-menu>
      <span>dialog组件</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

svg {
  width: 2em;
  height: 2em;
}

.el-menu-item span {
  margin-left: 10px;
}
</style>
