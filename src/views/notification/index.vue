<template>
  <div>
    <!-- <notification :value="50" ></notification>
    <br/>
    <br/>
    <notification :value="50" :max="30"></notification>
    <br/>
    <br/>
    <notification :value="50" :max="30" isDot></notification>
    <br/>
    <br/>
    <notification icon="ChatRound" :value="50" :max="30" isDot></notification> -->
    <notification :value="50" >
    <template #default>
     <ToDoList :list="list" :actions="actions"></ToDoList>
    </template>
    </notification>
  </div>
</template>

<script setup>
import { ref} from 'vue'
import notification from '../../components/notification/index.vue'
import ToDoList from '../../components/ToDoList/index.vue'
import {list,actions} from './data'
</script>
<style  scoped>
</style>