<template>
    <el-form ref="form" v-if="model" :validate-on-rule-change="false" :rules="rules" :model="model" v-bind="$attrs">
        <template v-for="(item, index) in props.formOptions" :key="index">
            <el-form-item v-if="!item.children || !item.children.length" :prop="item.prop" :label="item.label">
                <!-- 非上传 -->
                <component v-if="item.type !== 'upload'" :placeholder="item.placeholder" v-bind="item.attrs"
                    :is="`el-${item.type}`" v-model="model[item.prop!]"></component>
                <!-- 上传 -->
                <el-upload multiple v-else v-bind="item.uploadAttrs" :on-preview="onPreview" :on-remove="onRemove"
                    :on-success="onSuccess" :on-error="onError" :on-progress="onProgress" :on-change="onChange"
                    :before-upload="beforeUpload" :before-remove="beforeRemove" :http-request="httpRequest"
                    :on-exceed="onExceed">
                    <slot name="uploadArea"></slot>
                    <slot name="uploadTip"></slot>
                </el-upload>

            </el-form-item>
            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component :placeholder="item.placeholder" v-bind="item.attrs" :is="`el-${item.type}`"
                    v-model="model[item.prop!]">
                    <component v-for="(child, i) in item.children" :key="i" :is="`el-${child.type}`"
                        :label="child.label" :value="child.value">
                    </component>
                </component>
            </el-form-item>
        </template>
        <!-- 操作项 -->
        <el-form-item>
            <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    // 表单的配置选项
    formOptions: {
        type: Array,
        required: true
    },
    // 用户自定义上传方法
    httpRequest: {
        type: Function
    },
})
console.log(props.formOptions)

// 表单数据

const model = ref(null)
const rules = ref(null)
const form = ref(null)

const initForm = () => {
    if (props.formOptions && props.formOptions.length) {
        let m = {}
        let r = {}
        props.formOptions.map((item: any) => {
            m[item.prop!] = item.value
            r[item.prop!] = item.rules
        })
        model.value = JSON.parse(JSON.stringify(m))
        rules.value = JSON.parse(JSON.stringify(r))
    }
}

onMounted(() => {
    initForm()
})

// 监听props.formOptions的变化，重新初始化表单
watch(() => props.formOptions, () => {
    initForm()
}, { deep: true })

const emits = defineEmits(["on-preview", "on-remove", "on-success", "on-error", "on-progress", "on-change", "before-upload", "before-remove", "on-exceed"])

// 上传组件的所有方法
const onPreview = (file: any) => {
    emits("on-preview", file)
}

const onRemove = (file: any, fileList: any) => {
    emits("on-remove", { file, fileList })
}

const onSuccess = (response: any, file: any, fileList: any) => {
    emits("on-success", { response, file, fileList })
}

const onError = (err: any, file: any, fileList: any) => {
    emits("on-error", { err, file, fileList })
}

const onProgress = (event: any, file: any, fileList: any) => {
    emits("on-progress", { event, file, fileList })
}

const onChange = (file: any, fileList: any) => {
    emits("on-change", { file, fileList })
}

const beforeUpload = (file: any) => {
    emits("before-upload", file)
}

const beforeRemove = (file: any, fileList: any) => {
    emits("before-remove", { file, fileList })
}

const onExceed = (files: any, fileList: any) => {
    emits("on-exceed", { files, fileList })
}

</script>
<style lang='scss' scoped></style>