<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";

//el-table的data数据
const tableData = ref([]);
// 在哪一页
const currentPage = ref(1);
// 每页多少条数据
const pageSize = ref(10);
// 总数
const total = ref(null);

const getData = () => {
  // 构造请求的URL和参数  
  const url = "http://localhost:3000/my/activity/allActivity";
  const params = {
    limit: pageSize.value,
    page: currentPage.value
  };

  // 使用axios发送GET请求，通过params对象传递查询参数  
  axios.get(url, { params })
    .then((res) => {
      console.log(res.data.data);
      tableData.value = res.data.data;
      total.value = res.data.total;

    })
    .catch((error) => {
      // 处理错误情况  
      console.error('There was an error!', error);
    });
};
onMounted(() => {
  getData(pageSize.value, currentPage.value);
});

// 每页多少条数据
let handleSizeChange = (val) => {
  console.log('当前一页多少条数据', val)
  pageSize.value = val;
  getData();
};

// 在那一页
let handleCurrentChange = (val) => {
  console.log("当前在哪一页", val)
  currentPage.value = val;
  getData()
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

    <!-- 自定义编辑插槽 -->
    <!-- <template #editCell="{ scope }">
      <div style="display: flex;margin-left: 8px;">
        <el-button size="small" type="primary">点击</el-button>
        <el-button size="small" type="danger">取消</el-button>
      </div>
    </template> -->

    <!-- 自定义编辑区域 -->
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
      <el-button size="small" type="danger" @click="deleteAction(scope)">删除</el-button>
    </template>
  </MyTable>
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
