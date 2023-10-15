<template>
    <chooseArea @select="getSelectData"></chooseArea>
</template>

<script setup>
import { ref } from 'vue'
import chooseArea from '../../components/chooseArea/index.vue'

const getSelectData = (selectThing) => {
    console.log(selectThing)
}

</script>
<style  scoped></style>