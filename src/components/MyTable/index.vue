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
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String,
    default: 'left'
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [5, 10, 15]
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0
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

const emits = defineEmits(["sizeChange", "currentChange"]);

// 分页的页数改变
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`);
  emits("sizeChange", val);
};

// 分页的页码改变
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`);
  emits("currentChange", val);
};

// 计算属性计算出分页器的位置
const paginationLayout = computed(() => {
  if (props.paginationAlign === "left") {
    return "flex-start";
  } else if (props.paginationAlign === "center") {
    return "center";
  } else if (props.paginationAlign === "right") {
    return "flex-end";
  }
});
</script>

<template>
  <el-table v-bind="$attrs" :data="tableData" style="width: 100%" v-loading="isLoading"
    :element-loading-text="elementLoadingText" :element-loading-spinner="elementLoadingIcon">
    <template v-for="(item, index) in options" :key="index">
      <!-- 正常展示数据的区域 -->
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </template>

    <!-- 编辑区域 -->
    <el-table-column v-if="actionOptions.show" :label="actionOptions.label" :align="actionOptions.align"
      :width="actionOptions.width">
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div v-if="pagination && !isLoading" class="pagination" :style="{ justifyContent: paginationLayout }">
    <el-pagination currentPage.sync="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
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

.pagination {
  display: flex;
  margin-top: 16px;
}
</style>
