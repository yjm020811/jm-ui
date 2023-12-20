<template>
  <MyDialog
    btnName="点击打开dialog"
    dialogTitle="我是dialog的标题"
    @updateCancel="cancel"
    @updateConfirm="confirm"
    @closeConfirm="closeConfirm"
    @cancelConfirm="cancelConfirm"
  >
    <template #content> 这是内容 </template>
  </MyDialog>
</template>
<script setup>
const cancel = () => {
  console.log("点击了自己封装的取消按钮");
};

const confirm = () => {
  console.log("点击了自己封装的确认按钮");
};

const closeConfirm = () => {
  console.log("点击关闭confirm");
};

const cancelConfirm = () => {
  console.log("点击取消confirm");
};
</script>
<style scoped></style>
