<script setup>
import { ref } from "vue";
import MyTable from "../../components/MyTable/index.vue";
//表格数据
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

//表格配置
const options = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    width: 180,
    slot: "date"
  },
  {
    label: "姓名",
    prop: "name",
    align: "center"
  },
  {
    label: "地址",
    prop: "address",
    align: "center"
  },
  {
    label: "操作",
    align: "center",
    action: true
  }
];

// 编辑表格数据
const edit = (scope) => {
  console.log(`编辑表格`, scope.row);
};

//删除表格数据
const deleteAction = (scope) => {
  console.log(`删除表格`, scope.row);
};
</script>

<template>
  <MyTable :tableData="tableData" :options="options">
    <template #date="{ scope }">
      <el-icon-timer></el-icon-timer>
      {{ scope.row.date }}
    </template>
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button size="small" type="danger" @click="deleteAction(scope)"
        >删除</el-button
      >
    </template>
  </MyTable>
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
