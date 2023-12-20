<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

//el-table的data数据
const tableData = ref([]);
onMounted(() => {
  axios.get("https://api.vvhan.com/api/wbhot").then((res) => {
    console.log(res.data.data);
    tableData.value = res.data.data;
  });
});

//el-table-column配置
const options = [
  {
    label: "标题",
    prop: "title",
    align: "center",
    width: 300,
    edit: true
  },
  {
    label: "地址",
    prop: "url",
    align: "center",
    slot: "url"
  },
  {
    label: "热度",
    prop: "hot",
    align: "center"
  },
  // 在table的末尾的操作列设置插槽
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

//分页的配置(到毕设上面去看详细的table分页)
onMounted(() => {
  const current = ref(1);
  const pageSize = ref(5);
});
</script>

<template>
  <MyTable
    :tableData="tableData"
    :options="options"
    elementLoadingText="加载中，请等待！"
    :elementLoadingIcon="svg"
  >
    <template #url="{ scope }">
      <a
        :href="scope.row.url"
        style="text-decoration: none; color: skyblue"
        target="_blank"
        >url:{{ scope.row.title }}</a
      >
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
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
