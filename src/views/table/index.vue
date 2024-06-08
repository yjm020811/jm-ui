<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";

//el-table的data数据
const tableData = ref([]);
const current = ref(1);
const pageSize = ref(10);
const total = ref(16);

const getData = () => {
  // 获取数据
  axios
    .get("http://localhost:3000/my/activity/allActivity")
    .then((res) => {
      console.log(res.data.data);
      tableData.value = res.data.data;
    });
};
onMounted(() => {
  getData();
});

let handleSizeChange = (val) => {
  pageSize.value = val
  getData()
}
let handleCurrentChange = (val) => {
  current.value = val
  getData()
}

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
    align: "center"
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

//删除表格数据
const deleteAction = (scope) => {
  console.log(`删除表格`, scope.row);
};

//svg
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
</script>

<template>
  <MyTable :tableData="tableData" border :options="options" elementLoadingText="加载中，请等待！" :elementLoadingIcon="svg"
    :actionOptions="actionOptions" pagination :total="total" :currentPage="current" paginationAlign="right"
    @sizeChange="handleSizeChange" @currentChange="handleCurrentChange">
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
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
