<template>
    <el-container>
        <el-aside width="auto">
            <navSide :isCollapse="isCollapse"></navSide>
        </el-aside>
        <el-container>
            <el-header>
                <navHeader @updateCollapse="changeCollapse"></navHeader>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import navHeader from './navHeader/index.vue'
import navSide from './navSide/index.vue'

const isCollapse = ref(false)

const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
}

</script>

<style  scoped>
.el-header {
    border-bottom: 1px solid #eee;
}


</style>