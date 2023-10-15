<!-- 父组件 -->
<template>
    <choose-icon title="选择图标" :visible="visible" @update:visible="changeVisible">选择图标</choose-icon>
</template>

<script setup>
import { ref } from 'vue'
import chooseIcon from '../../components/chooseIcon/index.vue'

const visible = ref(false)

const changeVisible = (val) => {
    //重新给visible赋值
    visible.value = val;
}

</script>
<style  scoped></style>