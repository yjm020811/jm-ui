<template>
    <div>
        <el-select clearable placeholder="请选择省份" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>

        <el-select clearable :disabled="!province" placeholder="请选择城市" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>

        <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import allAreas from './pca-code.json'

const province = ref('')
const city = ref('')
const area = ref('')

const areas = ref(allAreas)

const selectCity = ref([])

const selectArea = ref([])

//监听省份的变化
watch(() => province.value, val => {
    if (val) {
        //如果item.code与val相等，则将item.children赋值给selectCity
        const cities = areas.value.find(item => item.code === val).children
        selectCity.value = cities
        console.log(selectCity.value);
    }
    city.value = '',
        area.value = ''
})

//监听城市的变化
watch(() => city.value, val => {
    if (val) {
        console.log(val);
        const areas = selectCity.value.find(item => item.code === val).children
        console.log(areas);
        selectArea.value = areas
    }
    area.value = ''
})

//通知父组件选择的内容
const emits = defineEmits(['select'])

watch(() => area.value, val => {
    //当区域的值发生修改才会触发emits事件
    if (val) {
        const provinceData = {
            code: province.value,
            name: areas.value.find(item => item.code === province.value).name
        }
        const cityData = {
            code: city.value,
            name: selectCity.value.find(item => item.code === city.value)?.name
        }
        const areaData = {
            code: area.value,
            name: selectArea.value.find(item => item.code === val)?.name
        }
        // console.log(provinceData, cityData, areaData);
        //派发事件
        emits('select',
            {
                province: provinceData,
                city: cityData,
                area: areaData
            }
        )
    }
})


</script>
<style  scoped>
:deep(.el-input__wrapper) {
    margin-right: 10px;
}
</style>