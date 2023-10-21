<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
  >
  <template #default>
    <slot></slot>
  </template>
    <template #reference>
      <el-badge :value="value" :max="max" :isDot="isDot">
        <component :is="`el-icon${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
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
</script>
<style scoped></style>
