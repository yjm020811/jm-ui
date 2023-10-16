<template>
    <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/">
            <el-icon-menu></el-icon-menu>
            <span>首页</span>
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
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})


</script>
<style  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>