<template>
  <div>
    <!-- 单纯表单 -->
    <MyForm
      :formOptions="formOptions"
      @on-preview="onPreview"
      @on-remove="onRemove"
      @on-success="onSuccess"
      @on-error="onError"
      @on-progress="onProgress"
      @on-change="onChange"
      @before-upload="beforeUpload"
      @before-remove="beforeRemove"
      @http-request="httpRequest"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        jpg/png文件，大小不超过{{ uploadAttrs.maxSize }}MB
      </template>
      <template #personSlot> 自定义插槽内容 </template>
      <template #action="scope">
        <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
        <el-button @click="reset(scope)">重置</el-button>
      </template>
    </MyForm>
    <br />
    <br />
    <br />
    <br />
    <!-- 结合el-dialog -->
    <el-button type="primary" @click="openDialog">打开dialog结合form</el-button>
    <el-dialog v-model="dialogVisible" destroy-on-close>
      <MyForm
        :formOptions="formOptions"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @on-success="onSuccess"
        @on-error="onError"
        @on-progress="onProgress"
        @on-change="onChange"
        @before-upload="beforeUpload"
        @before-remove="beforeRemove"
        @http-request="httpRequest"
        @on-exceed="handleExceed"
      >
        <template #uploadArea>
          <el-button type="primary">点击上传</el-button>
        </template>
        <template #uploadTip>
          jpg/png文件，大小不超过{{ uploadAttrs.maxSize }}MB
        </template>
        <template #personSlot> 自定义插槽内容 </template>
        <template #action="scope">
          <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
          <el-button @click="reset(scope)">重置</el-button>
        </template>
      </MyForm>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { FormInstance, FormOptions } from "../../components/myForm/types/types";

interface Scope {
  form: FormInstance;
  model: any;
}

// 上传配置
const uploadAttrs = reactive({
  action:
    "https://www.yiyuen.com/e/file/upload/?token=qMoZkVkGza367X5Hw1w8ucKpPzvSSdKi&server=https://www.yiyuen.com/", // 上传地址
  //   data: {
  //     token: "123456" // 上传时附带的额外参数
  //   },
  multiple: true, // 是否支持多选
  limit: 3, // 限制上传数量
  accept: "image/png,image/jpeg,image/jpg", // 接受的文件类型
  maxSize: 0.5 // 文件大小限制(MB)
});

const formOptions: FormOptions[] = [
  {
    label: "姓名",
    prop: "name",
    type: "input",
    placeholder: "请输入姓名",
    // 一共24格，占据8格
    colSpan: 8,
    rules: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    label: "密码",
    prop: "password",
    type: "input",
    placeholder: "请输入密码",
    rules: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
    ],
    // 一共24格，占据16格
    colSpan: 16,
    attrs: {
      showPassword: true,
      clearable: true
    }
  },
  {
    type: "select",
    value: "",
    label: "性别",
    prop: "sex",
    placeholder: "请选择性别",
    rules: [{ required: true, message: "请选择性别", trigger: "change" }],
    attrs: {
      style: {
        width: "300px"
      }
    },
    children: [
      {
        type: "option",
        label: "男",
        value: "1"
      },
      {
        type: "option",
        label: "女",
        value: "2"
      }
    ]
  },
  {
    type: "checkbox-group",
    label: "爱好",
    prop: "hobby",
    value: [],
    rules: [{ required: true, message: "请选择爱好", trigger: "change" }],
    children: [
      {
        type: "checkbox",
        label: "篮球",
        value: "1"
      },
      {
        type: "checkbox",
        label: "足球",
        value: "2"
      },
      {
        type: "checkbox",
        label: "羽毛球",
        value: "3"
      }
    ]
  },
  {
    type: "radio-group",
    label: "书籍",
    prop: "book",
    value: "",
    rules: [{ required: true, message: "请选择书籍", trigger: "change" }],
    children: [
      {
        type: "radio",
        label: "JavaScript高级程序设计",
        value: "1"
      },
      {
        type: "radio",
        label: "Vue.js设计与实现",
        value: "2"
      },
      {
        type: "radio",
        label: "JavaScript权威指南",
        value: "3"
      }
    ]
  },
  {
    type: "date-picker",
    label: "日期",
    prop: "date",
    // 需要value显示今天
    value: new Date(),
    rules: [{ required: true, message: "请选择日期", trigger: "change" }],
    attrs: {
      style: {
        width: "300px"
      }
    }
  },
  {
    type: "slot",
    label: "自定义插槽名称",
    prop: "slot",
    value: "",
    // 插槽名称
    slotName: "personSlot"
  },
  {
    type: "upload",
    label: "上传",
    prop: "upload",
    value: "",
    uploadAttrs: uploadAttrs
  }
];

const onSubmit = (scope: Scope) => {
  scope.form.validate((valid: any) => {
    if (valid) {
      console.log(scope.model);
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("表单填写有误");
      return false;
    }
  });
};

// 打开dialog
const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

// 表单重置
const reset = (scope: any) => {
  scope.form.resetFields();
};

const onPreview = (file: any) => {
  console.log("onPreview", file);
};

const onRemove = (val: any) => {
  console.log("onRemove", val);
};

const onSuccess = (val: any) => {
  console.log("onSuccess", val);
};

const onError = (val: any) => {
  console.log("onError", val);
};

const onProgress = (val: any) => {
  console.log("onProgress", val);
};

const onChange = (val: any) => {
  console.log("onChange", val);
};

const beforeUpload = (val: any) => {
  console.log("beforeUpload", val);
  //上传之前携带参数
};

const beforeRemove = (val: any) => {
  console.log("beforeRemove", val);
};

const httpRequest = (config: any) => {
  console.log("httpRequest", config);
};

const handleExceed = (val: any) => {
  ElMessage.warning(
    `当前限制选择 3 个文件，本次选择了 ${val.files.length} 个文件，`
  );
};
</script>
<style lang="scss" scoped></style>
