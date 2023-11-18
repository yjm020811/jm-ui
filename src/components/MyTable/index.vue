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
  }
});
console.log(props);

// console.log();

//过滤操作选项后的一个配置
const tableOptions = computed(() =>
  //过滤出没有action的配置项
  props.options.filter((item) => {
    return !item.action;
  })
);
console.log(tableOptions);

//找出操作项的配置,如果找到item具有action项，就返回item
const actionOptions = computed(() => props.options.find((item) => item.action));
console.log(actionOptions);

//表格是否在加载中
const isLoading = computed(() => {
  if (props.tableData.length === 0 || !props.tableData) {
    return true;
  } else {
    return false;
  }
});

//编辑按钮点击事件
const handleEdit = (scope) => {
  console.log(scope.row);
};
</script>

<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingIcon"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
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
          <el-icon-edit
            class="edit"
            @click="handleEdit(scope)"
            v-if="item.edit"
          ></el-icon-edit>
        </template>
      </el-table-column>
    </template>

    <!-- 编辑区域 -->
    <el-table-column
      :label="actionOptions.label"
      :prop="actionOptions.prop"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <!-- action插槽 -->
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
