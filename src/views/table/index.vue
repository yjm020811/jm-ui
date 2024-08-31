<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { FormInstance, FormOptions } from "../../components/myForm/types/types";
import { ElMessage } from "element-plus";

interface Scope {
  form: FormInstance;
  model: any;
}

//el-table的data数据
const tableData = ref([]);
// 在哪一页
const currentPage = ref(1);
// 每页多少条数据
const pageSize = ref(10);
// 总数
const total = ref(null);

const getData = (...args: any) => {
  // 构造请求的URL和参数
  const url = "http://localhost:3000/my/activity/allActivity";
  const params = {
    limit: pageSize.value,
    page: currentPage.value
  };

  // 使用axios发送GET请求，通过params对象传递查询参数
  axios
    .get(url, { params })
    .then((res) => {
      console.log(res.data.data);
      tableData.value = res.data.data;
      total.value = res.data.total;
    })
    .catch((error) => {
      // 处理错误情况
      console.error("There was an error!", error);
    });
};
onMounted(() => {
  getData(pageSize.value, currentPage.value);
});

// 每页多少条数据
let handleSizeChange = (val) => {
  console.log("当前一页多少条数据", val);
  pageSize.value = val;
  getData();
};

// 在那一页
let handleCurrentChange = (val) => {
  console.log("当前在哪一页", val);
  currentPage.value = val;
  getData();
};

//el-table-column配置
const options = [
  {
    label: "活动id",
    prop: "id",
    align: "center",
    width: 300
  },
  {
    label: "活动描述",
    prop: "activityDesc",
    align: "center"
  },
  {
    label: "活动名称",
    prop: "activityName",
    align: "center",
    editable: true
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
    type: "date-picker",
    label: "日期",
    prop: "activityStartTime",
    // 需要value显示今天
    value: "",
    rules: [{ required: true, message: "请选择日期", trigger: "change" }],
    attrs: {
      style: {
        width: "300px"
      }
    }
  }
];
const dialogVisible = ref(false);
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
  <MyTable :tableData="tableData" border :options="options" elementLoadingText="加载中，请等待！" :actionOptions="actionOptions"
    pagination :total="total" :currentPage="currentPage" :pageSize="pageSize" paginationAlign="right"
    @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" @confirm="confirm" @cancel="cancel">
    <template #activityStartTime="{ scope }">
      <!-- 使用dayjs -->
      <span>{{
        dayjs(scope.row.activityStartTime).format("YYYY-MM-DD HH:mm:ss")
      }}</span>
    </template>

    <!-- 自定义编辑区域 -->
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
      <el-button size="small" type="danger" @click="deleteAction(scope)">删除</el-button>
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
