<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :http-request="handleUpload"
  >
    <el-button v-if="props.mode === 'button'" type="primary" size="small"
      >点击上传</el-button
    >
    <template v-if="props.mode === 'img'">
      <div class="upload-wrapper">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
const imageUrl = "";
const props = defineProps({
  // 上传的模式（button/img）
  mode: {
    type: String,
    default: "button"
  },
  // img模式的宽度
  width: {
    type: String,
    default: "100px"
  },
  // img模式的高度
  height: {
    type: String,
    default: "100px"
  }
});
console.log(props);

//自定义上传的方法
const handleUpload = (data) => {
  const file = data.file;
  console.log(file);
  // form
  const form = new FormData();
  form.append("file", file);
  // 调用接口
  // const request = {
  //   url: "XXX",
  //   method: "post",
  //   headers: {
  //     "Content-Type": "multipart/from-data"
  //   },
  //   data: form
  // };
};
</script>

<style scoped>
.el-icon.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  /* 收到来自父组件的宽高加以v-bind双向绑定 */
  width: v-bind(width);
  height: v-bind(height);
  text-align: center;
  border: 1px dashed #8c939d;
}
</style>
