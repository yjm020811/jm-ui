<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">
        <h3 class="dialog-title" :style="{ color: color }">{{ title }}</h3>
        <button @click="close" class="dialog-close">x</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["title", "color"]);
const emit = defineEmits(["close"]);
const visible = ref(true);

function close() {
  visible.value = false;
  emit("close");
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  position: relative;
}

.dialog-title {
  text-align: center;
  margin: 20px 0;
}

.dialog-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 20px;
}

.dialog-close:hover {
  color: #0056b3;
}
</style>
