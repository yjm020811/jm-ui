<template>
  <div style="width: 200px">
    <menus :data="data" defaultActive="2" text-color="red"></menus>
  </div>
</template>

<script setup>
import menus from "../../components/menus/index.vue";

const data = [
  {
    name: "导航1",
    index: "1",
    icon: "document"
  },
  {
    name: "导航2",
    index: "2",
    icon: "document"
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "document"
      }
    ]
  }
];
</script>
<style scoped></style>
