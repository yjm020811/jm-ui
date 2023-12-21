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
  },
  //加载的文案
  elementLoadingText: {
    type: String
  },
  //加载图标名
  elementLoadingIcon: {
    type: String
  },
  //编辑区域的配置
  actionOptions: {
    type: Object
  }
});
console.log(props);

//表格是否在加载中
const isLoading = computed(() => {
  if (props.tableData.length === 0 || !props.tableData) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingIcon"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 正常展示数据的区域 -->
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </template>

    <!-- 编辑区域 -->
    <el-table-column
      v-if="actionOptions.show"
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped>
.edit {
  width: 1.2em;
  height: 1.2em;
  position: relative;
  top: 4px;
  left: 4px;
  cursor: pointer;
}
</style>
