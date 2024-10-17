<template>
  <el-popover placement="bottom" :width="340" trigger="click">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge :value="value" :max="max" :isDot="isDot">
        <component :is="`el-icon${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
  <h2 style="margin-top: 20px">命令式组件</h2>
  <el-button type="primary" @click="loadingAction">命令式组件</el-button>
</template>

<script setup>
import { useDialog } from "../../components/MyDialog/useDialog";
import { toLine } from "../../utils";
const props = defineProps({
  //显示的图标
  icon: {
    type: String,
    default: "Bell"
  },
  //通知的数量
  value: {
    type: [String, Number],
    default: ""
  },
  //最大值
  max: {
    type: Number
  },
  //是否显示小圆点
  isDot: {
    type: Boolean,
    default: false
  }
});

const loadingAction = () => {
  useDialog("我是命令式组件", "red");
};
</script>
<style scoped>
svg {
  width: 2em;
  height: 2em;
}
</style>
