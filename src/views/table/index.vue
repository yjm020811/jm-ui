<script lang="ts" setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { FormInstance, FormOptions } from "../../components/myForm/types/types";
import { ElMessage } from "element-plus";
import { tableMock } from "./tableMock";

interface Scope {
  form: FormInstance;
  model: any;
}

//el-table的data数据
const tableData = ref(tableMock.data);
// 总数
const total = ref(tableMock.total);
// 在哪一页
const currentPage = ref(1);
// 每页多少条数据
const pageSize = ref(5);
// 是否显示弹窗
const dialogVisible = ref(false);

// 当前页数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return tableData.value.slice(startIndex, endIndex);
});

// 每页条数改变处理
let handleSizeChange = (val: number) => {
  console.log("当前一页多少条数据", val);
  pageSize.value = val;

  // 根据新分页数调整页码，确保不会越界
  const maxPage = Math.ceil(total.value / pageSize.value);
  currentPage.value = Math.min(currentPage.value, maxPage);
};

// 在那一页
let handleCurrentChange = (val: any) => {
  console.log("当前在哪一页", val);
  currentPage.value = val;
};

//el-table-column配置
const options = [
  {
    label: "活动id",
    prop: "id",
    align: "center",
    width: 80
  },
  {
    label: "活动描述",
    prop: "activityDesc",
    align: "center",
    showOverflowTooltip: true
  },
  {
    label: "活动名称",
    prop: "activityName",
    align: "center",
    editable: true
  },
  {
    label: "活动报名费",
    prop: "price",
    align: "center",
    sortable: true,
    sortMethod: (a: any, b: any) => {
      return a.price - b.price;
    }
  },
  {
    label: "活动开始时间",
    prop: "activityStartTime",
    align: "center",
    slot: "activityStartTime" //开启插槽
  }
];

//是否在末尾需要插槽
const actionOptions = {
  show: true,
  label: "操作",
  align: "center"
};

// 编辑表格数据
const edit = (scope) => {
  console.log(`编辑表格`, scope.row);
  dialogVisible.value = true;
  // 获取scope.row的数据类型，遍历formOptions，添加到对应的prop的value
  for (let key in scope.row) {
    for (let i = 0; i < formOptions.length; i++) {
      if (formOptions[i].prop === key) {
        formOptions[i].value = scope.row[key];
      }
    }
  }
};

// 点击勾
const confirm = (scope) => {
  console.log(`勾选`, scope.row);
};

// 点击叉
const cancel = (scope) => {
  console.log(`关闭`, scope.row);
};

//删除表格数据
const deleteAction = (scope) => {
  console.log(`删除表格`, scope.row);
};

// 选择表格数据
const handleSelectionChange = (selection) => {
  console.log(`当前选中的所有行`, selection);
};

const formOptions: FormOptions[] = [
  {
    label: "活动id",
    prop: "id",
    type: "input",
    placeholder: "请输入活动id",
    value: "",
    rules: [{ required: true, message: "请输入活动id", trigger: "blur" }],
    attrs: {
      clearable: true
    }
  },
  {
    label: "活动描述",
    prop: "activityDesc",
    type: "input",
    placeholder: "请输入活动描述",
    value: "",
    rules: [
      { required: true, message: "请输入活动描述", trigger: "blur" },
      { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    label: "活动名称",
    prop: "activityName",
    type: "input",
    placeholder: "请输入活动名称",
    value: "",
    rules: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    label: "活动报名费",
    prop: "price",
    type: "input",
    placeholder: "请输入活动报名费",
    value: "",
    rules: [{ required: true, message: "请输入活动报名费", trigger: "blur" }]
  },
  {
    type: "date-picker",
    label: "日期",
    prop: "activityStartTime",
    // 需要value显示今天
    value: "",
    rules: [{ required: true, message: "请选择日期", trigger: "change" }],
    attrs: {
      style: {
        width: "340px"
      }
    }
  }
];

const onSubmit = (scope: Scope) => {
  scope.form.validate((valid: any) => {
    if (valid) {
      console.log(scope.model);
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("表单填写有误");
      return false;
    }
  });
};

// 表单重置
const reset = (scope: any) => {
  scope.form.resetFields();
  dialogVisible.value = false;
};
</script>

<template>
  <MyTable
    :tableData="paginatedData"
    :options="options"
    elementLoadingText="加载中，请等待！"
    :actionOptions="actionOptions"
    :total="total"
    :currentPage="currentPage"
    :pageSize="pageSize"
    paginationAlign="right"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
    @confirm="confirm"
    @cancel="cancel"
    :showSelection="true"
    @selectionChange="handleSelectionChange"
  >
    <template #activityStartTime="{ scope }">
      <!-- 使用dayjs -->
      <span>{{
        dayjs(scope.row.activityStartTime).format("YYYY-MM-DD HH:mm:ss")
      }}</span>
    </template>

    <!-- 自定义编辑区域 -->
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button size="small" type="danger" @click="deleteAction(scope)"
        >删除</el-button
      >
    </template>
  </MyTable>
  <el-dialog destroy-on-close v-model="dialogVisible" title="编辑活动信息">
    <MyForm :formOptions="formOptions">
      <template #action="scope">
        <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
        <el-button @click="reset(scope)">关闭</el-button>
      </template>
    </MyForm>
  </el-dialog>
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
