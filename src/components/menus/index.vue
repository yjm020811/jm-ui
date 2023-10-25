<template>
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item,index) in data" :key="index">
        <!-- 一级菜单 -->
        <el-menu-item v-if="!item.children || item.children.length <=0" :index="item.index">
            <component v-if="item.icon" :is="`el-icon-${toLine(item.icon)}`"></component>
            <span>{{ item.name }}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length " >
            <template #title>
                <component v-if="item.icon" :is="`el-icon-${toLine(item.icon)}`"></component>
            <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item1,index1) in item.children" :index="item1.index" :key="index1">
            <component v-if="item1.icon" :is="`el-icon-${toLine(item1.icon)}`"></component>
            <span>{{ item1.name }}</span>
        </el-menu-item>
        </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { toLine } from "../../utils";
const props = defineProps({
    //导航菜单的数据
  data: {
    type: Array,
    required: true
  },
  //默认选中的菜单
  defaultActive:{
    type:String,
    default:"",
  },
  //是否是路由模式
  router:{
    type:Boolean,
    default:false
  }
});

</script>
<style scoped>
svg {
    width: 2em;
    height: 2em;
  }
</style>
