<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="400px">
          <div
            class="container"
            v-for="(item1, index1) in item.content"
            :key="index1"
            @click="clickItem(item1,index1)"
          >
            <div class="avatar" v-if="item1.avatar">
              <el-avatar :size="30" :src="item1.avatar"></el-avatar>
            </div>
            <div class="content">
              <div class="title" v-if="item1.title">
                <div>{{ item1.title }}</div>
                <div>
                  <el-tag size="small" :type="item1.tagType" v-if="item1.tag">{{
                    item1.tag
                  }}</el-tag>
                </div>
              </div>
              <div v-if="item1.desc">{{ item1.desc }}</div>
              <div class="time" v-if="item1.time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div class="a-item" v-for="(action, i) in actions" :key="action" :class="{'border': i !==action.length }" @click="clickAction(action,i)">
              <div class="a-icon" v-if="action.icon">
                <component :is=" `el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { toLine } from "../../utils";
const props = defineProps({
  //列表的内容
  list: {
    type: Array,
    required: true
  },
  //操作的内容
  actions: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(["clickItem","clickAction"]);

const clickItem =(item,index)=>{
  emits('clickItem',{item,index})
}

const clickAction = (action,index)=>{
  emits('clickAction',{action,index})
}

</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
}
.container:hover{
  background-color:#e1f4ff ;
}
.avatar {
  flex: 1;
}
.content {
  flex: 3;
}
.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  cursor: pointer;
}
.a-item {
  height: 50px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.a-icon {
  margin-right: 4px;
  position: relative;
  top: 2px;
}
.border{
  border-right: 1px solid #eee;
}
</style>
