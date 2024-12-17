<script setup>
import { ref, computed } from "vue";
import { toLine } from "../../utils/index";

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
    type: String,
    default: "加载中..."
  },
  //加载图标名
  elementLoadingIcon: {
    type: String,
    default: "Loading"
  },
  // 可编辑单元格显示的图标
  editIcon: {
    type: String,
    default: "edit"
  },
  //编辑区域的配置
  actionOptions: {
    type: Object
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: true
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String,
    default: "left"
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
  },
  // 是否显示选择
  showSelection: {
    type: Boolean,
    default: false
  },
  // 是否显示index
  showIndex: {
    type: Boolean,
    default: false
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

const emits = defineEmits([
  "confirm",
  "cancel",
  "sizeChange",
  "currentChange",
  "selectionChange"
]);

/**
 * 分页的页数改变
 * @param val 分页的页数
 */
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`);
  emits("sizeChange", val);
};

/**
 * 分页的页码改变
 * @param val 分页的页码
 */
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`);
  emits("currentChange", val);
};

// 当前点击的编辑单元格
const currentEdit = ref("");

// 点击编辑图标
const clickEdit = (scope) => {
  console.log(scope);
  // 获取唯一的标识
  currentEdit.value = scope.$index + scope.column.id;
  console.log(currentEdit.value);
};

// 点击勾
const confirm = (scope) => {
  emits("confirm", scope);
};

// 点击叉
const cancel = (scope) => {
  emits("cancel", scope);
};

// 选择表格数据
const handleSelectionChange = (val) => {
  emits("selectionChange", val);
};

// 点击编辑单元格
const clickEditCell = () => {
  currentEdit.value = "";
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
  <el-table
    v-bind="$attrs"
    :data="tableData"
    style="width: 100%"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingIcon"
    @selection-change="handleSelectionChange"
  >
    <!-- 选择  -->
    <el-table-column type="selection" v-if="showSelection" width="55" />
    <!-- 序号 -->
    <el-table-column
      type="index"
      align="center"
      label="序号"
      v-if="showIndex"
      width="55"
    />
    <!-- 循环遍历options -->
    <template v-for="(item, index) in options" :key="index">
      <!-- 正常展示数据的区域 -->
      <el-table-column v-bind="item" align="center">
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div style="display: flex">
              <el-input size="small" v-model="scope.row[item.prop]"></el-input>
              <div @click.stop="clickEditCell">
                <slot
                  name="editCell"
                  v-if="$slots.editCell"
                  :scope="scope"
                ></slot>
                <div class="icons" v-else>
                  <el-icon-check
                    class="check"
                    @click="confirm(scope)"
                  ></el-icon-check>
                  <el-icon-close
                    class="close"
                    @click="cancel(scope)"
                  ></el-icon-close>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else>{{ scope.row[item.prop] }}</span>
            <component
              @click.stop="clickEdit(scope)"
              :is="`el-icon-${toLine(editIcon)}`"
              class="edit"
              v-if="item.editable"
            >
            </component>
          </template>
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

  <!-- 分页 -->
  <div
    v-if="pagination && !isLoading"
    class="pagination"
    :style="{ justifyContent: paginationLayout }"
  >
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
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

.icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 4px;

  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    cursor: pointer;
  }
}

.check {
  color: red;
}

.close {
  color: green;
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
</style>
