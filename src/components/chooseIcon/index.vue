<!-- 子组件 -->
<template>
  <el-button :type="props.color" @click="handleClick">
    <slot></slot>
  </el-button>

  <div class="choose-icon-dialog-height">
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogClose">
      <div class="container">
        <div class="item" v-for="item in Object.keys(ElementPlusIconsVue)" :key="item" @click="clickItem(item)">
          <!-- 使用动态组件循环图标组件 -->
          <component :is="`el-icon${toLine(item)}`"></component>
          <div class="text">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { toLine } from "../../utils/index.js";
import { useCopy } from "../../hooks/useCopy";

const props = defineProps({
  // 弹出框的标题
  title: String,
  // 控制弹出框的显示与隐藏
  visible: Boolean,
  //按钮的颜色类型
  color: String
});

const emits = defineEmits(["update:visible"]);
//浅拷贝，子组件不能修改父组件的值（数据单向流）
const dialogVisible = ref(props.visible);

const handleClick = () => {
  emits("update:visible", !props.visible);
};

//第一次监听将props.visible的值传递给dialogVisible
//当父组件传递过来的props发生变化时，会触发watch函数
watch(
  () => props.visible,
  (val) => {
    console.log("props的值变了", val);
    dialogVisible.value = val;
  }
);

//当el-dialog触发close函数再次改变父组件visible的值
const dialogClose = () => {
  emits("update:visible", !props.visible);
};

const clickItem = (item) => {
  let text = `<el-icon${toLine(item)} />`;
  useCopy(text);
  dialogVisible.value = false;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}

.text {
  font-size: 14px;
}

svg {
  height: 2em;
  width: 2em;
}

:deep(.el-dialog__body) {
  height: 500px;
}
</style>
