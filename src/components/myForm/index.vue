<template>
  <el-form
    ref="form"
    v-if="model"
    :validate-on-rule-change="false"
    :rules="rules"
    :model="model"
    v-bind="$attrs"
  >
    <el-row :gutter="20">
      <template v-for="(item, index) in props.formOptions" :key="index">
        <el-col :span="item.colSpan || 12">
          <el-form-item
            v-if="!item.children || !item.children.length"
            :prop="item.prop"
            :label="item.label"
          >
            <!-- 非上传且不是插槽内容 -->
            <!-- 注意：本项目采用的全局注册elementPlus组件，所以这里的动态组件能够正常渲染出来，当项目采用的局部注册就需要在main.js中单独处理并导入utils中的函数 -->
            <component
              v-if="item.type !== 'upload' && item.type !== 'slot'"
              :placeholder="item.placeholder"
              v-bind="item.attrs"
              :is="`el-${item.type}`"
              v-model="model[item.prop!]"
            ></component>
            <!-- 上传 -->
            <el-upload
              multiple
              v-if="item.type === 'upload'"
              v-bind="item.uploadAttrs"
              :on-preview="onPreview"
              :on-remove="onRemove"
              :on-success="onSuccess"
              :on-error="onError"
              :on-progress="onProgress"
              :on-change="onChange"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :http-request="httpRequest"
              :on-exceed="onExceed"
            >
              <slot name="uploadArea"></slot>
              <slot name="uploadTip"></slot>
            </el-upload>
            <!-- 自定义插槽 -->
            <slot
              v-if="item.type === 'slot'"
              :name="item.slotName"
              :model="model"
            ></slot>
          </el-form-item>
          <!-- 子项处理 -->
          <el-form-item
            v-if="item.children && item.children.length"
            :prop="item.prop"
            :label="item.label"
          >
            <component
              :placeholder="item.placeholder"
              v-bind="item.attrs"
              :is="`el-${item.type}`"
              v-model="model[item.prop!]"
            >
              <component
                v-for="(child, i) in item.children"
                :key="i"
                :is="`el-${child.type}`"
                :label="child.label"
                :value="child.value"
              >
              </component>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <!-- 操作项 -->
    <div style="display: flex; justify-content: flex-end">
      <slot name="action" :form="form" :model="model"></slot>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, PropType } from "vue";
import { FormInstance, FormOptions } from "./types/types";
import { ElMessage } from "element-plus";
const props = defineProps({
  // 表单的配置选项
  formOptions: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
});

// 表单数据
const model = ref(null);
const rules = ref(null);
const form = ref<FormInstance | null>();

const initForm = () => {
  if (props.formOptions && props.formOptions.length) {
    let m = {};
    let r = {};
    props.formOptions.forEach((item: FormOptions) => {
      m[item.prop!] = item.value ?? ""; // 默认值为空字符串
      r[item.prop!] = item.rules ?? []; // 默认值为空数组
    });
    model.value = JSON.parse(JSON.stringify(m));
    rules.value = JSON.parse(JSON.stringify(r));
  }
};

onMounted(() => {
  initForm();
});

// 监听props.formOptions的变化，重新初始化表单
watch(
  () => props.formOptions,
  () => {
    initForm();
  },
  { deep: true }
);

const emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed"
]);

// 上传组件事件处理方法

// 点击文件列表中已上传的文件时的钩子
const onPreview = (file: any) => emits("on-preview", file);
// 文件列表移除文件时的钩子
const onRemove = (file: any, fileList: any) =>
  emits("on-remove", { file, fileList });
// 文件上传成功时的钩子
const onSuccess = (response: any, file: any, fileList: any) => {
  let uploadItem = props.formOptions.find(
    (item: any) => item.type === "upload"
  );
  if (uploadItem) {
    (model.value as any)[uploadItem.prop!] = { response, file, fileList };
  }
  emits("on-success", { response, file, fileList });
};
// 文件上传失败时的钩子
const onError = (err: any, file: any, fileList: any) =>
  emits("on-error", { err, file, fileList });
// 文件上传时的钩子
const onProgress = (event: any, file: any, fileList: any) =>
  emits("on-progress", { event, file, fileList });
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const onChange = (file: any, fileList: any) =>
  emits("on-change", { file, fileList });
// 上传文件之前的钩子
const beforeUpload = (file: any) => {
  // 找到对应的 upload 配置项
  const uploadItem = props.formOptions.find((item) => item.type === "upload");
  if (uploadItem) {
    // 文件类型校验
    const acceptTypes = uploadItem.uploadAttrs?.accept;
    if (acceptTypes && !acceptTypes.includes(file.type)) {
      ElMessage.error(`请上传 ${acceptTypes} 类型的文件`);
      return false;
    }
    // 文件大小校验（可选）
    const maxSize = uploadItem.uploadAttrs?.maxSize;
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      ElMessage.error(`文件大小不能超过 ${maxSize}MB`);
      return false;
    }
    emits("before-upload", file);
    return true;
  }
  return false;
};
// 删除文件之前的钩子
const beforeRemove = (file: any, fileList: any) =>
  emits("before-remove", { file, fileList });
// 当超出限制时，执行的钩子函数
const onExceed = (files: any, fileList: any) =>
  emits("on-exceed", { files, fileList });
</script>
<style lang="scss" scoped></style>
