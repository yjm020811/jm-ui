<template>
    <el-header class="header">
        <span @click="toggle">
            <el-icon-expand v-if="isCollapse"></el-icon-expand>
            <el-icon-fold v-else></el-icon-fold>
        </span>
    </el-header>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['updateCollapse'])

const toggle = () => {
    // 修改props
    emits('updateCollapse')
}

</script>


<style  scoped>
.header {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>