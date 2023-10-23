<template>
  <div>
    <!-- <h2>通知菜单传入value</h2>
    <notification :value="50" ></notification>
    <br/>
    <br/>
    <h2>通知菜单传入value和max</h2>
    <notification :value="50" :max="30"></notification>
    <br/>
    <br/>
    <h2>通知菜单传入value和max和isDot</h2>
    <notification :value="50" :max="30" isDot></notification>
    <br/>
    <br/>
    <h2>自定义icon</h2>
    <notification icon="ChatRound" :value="50" :max="30" isDot></notification>
    <br/>
    <br/> -->
    <h2>完整的封装</h2>
    <notification :value="list[0].content.length" >
    <template #default>
     <ToDoList  @clickItem="clickItem"  @clickAction="clickAction" :list="list" :actions="actions"></ToDoList>
    </template>
    </notification>
  </div>
</template>

<script setup>
import { ref} from 'vue'
import notification from '../../components/notification/index.vue'
import ToDoList from '../../components/ToDoList/index.vue'
import {list,actions} from './data'

const clickItem = (val)=>{
  console.log(val);
}

const clickAction = (val)=>{
  console.log(val);
}

console.log(list[0].content.length);

</script>
<style  scoped>
</style>