<template>
  <chooseArea @select="getSelectData"></chooseArea>
</template>

<script setup>
const getSelectData = (selectThing) => {
  console.log(selectThing);
};
</script>
<style scoped></style>
