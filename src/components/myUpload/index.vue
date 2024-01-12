<template>
  <el-upload
    class="avatar-uploader"
    ref="uploadRef"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture"
    :http-request="handleUpload"
    :auto-upload="false"
    multiline
    :limit="5"
    v-model:file-list="fileList"
    :show-file-list="false"
    :on-change="handleChange"
  >
    <template #trigger>
      <el-button type="primary" style="margin-right: 2em">选择</el-button>
    </template>

    <el-button type="primary" @click="uploadRef.submit()">点击上传</el-button>
    <br />
    <el-button @click="console.log(fileList)" style="margin: 20px 0"
      >调试按钮</el-button
    >
    <br />

    <h4>上传预览</h4>
    <ul class="viewbox">
      <ol v-for="(item, index) in fileList" :key="index">
        <el-image :src="item.url" fit="cover"></el-image>
        <el-icon style="position: absolute; left: 6px; cursor: pointer"
          ><Search
        /></el-icon>
        <el-icon
          style="position: absolute; left: 160px; bottom: 6px; cursor: pointer"
          @click="handleRemove(index)"
          ><Delete
        /></el-icon>
        <el-icon
          v-if="item.status === 'success'"
          style="
            position: absolute;
            left: 160px;
            width: 1em;
            height: 1em;
            background-color: greenyellow;
            cursor: pointer;
          "
          ><Check
        /></el-icon>
      </ol>
    </ul>
  </el-upload>
</template>

<script setup>
import { Delete, Search, Check } from "@element-plus/icons-vue";
import { ref } from "vue";
const props = defineProps({
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

const uploadRef = ref(null);

//自定义上传的方法
const handleUpload = async (options) => {
  console.log(options);
  // 发起网络请求
  // const res = await axios.post("/upload", options.file);
};

const fileList = ref([]);
// 文件状态改变
const handleChange = (uploadFile, uploadFiles) => {
  console.log("当前上传的文件", uploadFile);
  console.log("所有已经上传的文件", uploadFiles);
};

// 预览时删除
const handleRemove = (index) => {
  fileList.value.splice(index, 1);
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

.viewbox {
  width: 100%;
  ol {
    width: 180px;
    height: 120px;
    padding: 3px;
    border: 1px solid #8c939d;
    float: left;
    margin: 3px;
    position: relative;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
