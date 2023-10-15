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
console.log(areas.value);

//下拉框中的城市
// const selectCity = computed(() => {
//     //当省份没有选择，返回空数组
//     if (!province.value) return []
//     //当选择了省份
//     if (province.value) {
//         return areas.value.find(item => item.code === province.value).children
//     }
// })
const selectCity = ref([])



//下拉框中的区域
// const selectArea = computed(() => {
//     console.log(selectCity.value);
//     //当省份没有选择，返回空数组
//     if (!city.value) return []
//     //当选择了城市
//     else {
//         return selectCity.value.find(item => item.code === city.value).children
//     }
// })

const selectArea = ref([])

//监听省份的值的变化
watch(() => province.value, val => {
    if (val) {
        const cities = areas.value.find(item => item.code === val).children
        selectCity.value = cities
        console.log(selectCity.value);
    }
    city.value = '',
        area.value = ''
})

//监听选择的城市的变化
watch(() => city.value, val => {
    if (val) {
        console.log(val);
        const areas = selectCity.value.find(item => item.code === val).children
        console.log(areas);
        areas.forEach(element => {
            //将所有的数据push到selectArea
            selectArea.value.push(element)
        });
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