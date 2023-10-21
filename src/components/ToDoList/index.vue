<template>
 <div class="list-tabs__item">
  <el-tabs>
  <el-tab-pane v-for="(item,index) in list" :key="index" :label="item.title" >
  </el-tab-pane>
 </el-tabs>
 </div>
</template>

<script setup>
import { ref} from 'vue'
const props =defineProps({
  //列表的内容
    list:{
      type:Array,
      required:true
    },
    //操作的内容
    actions :{
      type:Array,
      default:()=>[]
    }
})
console.log(props.list);
console.log(props.actions);
</script>
<style  scoped>
</style>