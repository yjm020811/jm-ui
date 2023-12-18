<template>
  <el-button :type="btnType" @click="dialogVisible = true">
    {{ btnName }}
  </el-button>

  <el-dialog v-bind="$attrs" v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="handleClose">
    <!-- 自定义内容插槽 -->
    <slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);

const props = defineProps({
  //打开dialog的按钮名称
  btnName: {
    type: String,
    required: true
  },
  // 按钮的类型
  btnType: {
    type: String,
    default: "primary"
  },
  // dialog的title
  dialogTitle: {
    type: String,
    required: true
  }
});

// 自定义事件
const emits = defineEmits([
  "updateCancel",
  "updateConfirm",
  "closeConfirm",
  "cancelConfirm"
]);

const handleClose = () => {
  ElMessageBox.confirm("确定关闭dialog吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      emits("closeConfirm");
      dialogVisible.value = false;
    })
    .catch(() => {
      emits("cancelConfirm");
    });
};

//  取消按钮的事件
const cancel = () => {
  dialogVisible.value = false;
  emits("updateCancel");
};

// 确定按钮的事件
const confirm = () => {
  dialogVisible.value = false;
  emits("updateConfirm");
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
