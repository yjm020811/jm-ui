<script setup>
import { computed } from "vue";
const props = defineProps({
  //表格的配置
  tableData: {
    type: Array,
    required: true
  },
  //表格数据
  options: {
    type: Array,
    required: true
  }
});
console.log(props);

//过滤操作选项后的一个配置
const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
);
console.log(tableOptions);

//找出操作项的配置
const actionOptions = computed(() => props.options.find((item) => item.action));
console.log(actionOptions);
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="(item, index) in tableOptions" :key="index">
      <!-- 没有自定义slot -->
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
      </el-table-column>
      <!-- 有自定义slot -->
      <el-table-column
        v-else
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="actionOptions.label"
      :prop="actionOptions.prop"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped></style>
<!-- 6-6 -->
