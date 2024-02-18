<template>
    <div class="trend">
        <div class="text" :style="{ color: textColor }">
            {{ text }}
        </div>
        <div class="icon">
            <component :is="`el-icon${toLine(upIcon)}`" :style="{ color: reverseColor ? '#52c41a' : upIconColor }"
                v-if="type === 'up'"></component>
            <component :is="`el-icon${toLine(downIcon)}`" :style="{ color: reverseColor ? '#f5222d' : downIconColor }
                " v-else></component>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { toLine } from '../../utils/index'

const props = defineProps({
    //标记当前的趋势是上升（up）还是下降（down）
    type: {
        type: String,
        default: "up"
    },
    //趋势显示的文字
    text: {
        type: String,
        default: "未传值"
    },
    //上升趋势的图标颜色
    upIconColor: {
        type: String,
        default: "#f5222d"
    },
    //下降趋势的图标颜色
    downIconColor: {
        type: String,
        default: "#52c41a"
    },
    //颜色反转(只在默认颜色上生效，如果使用自定义颜色，则不生效)
    reverseColor: {

    },
    //上升趋势的文字颜色
    upTextColor: {
        type: String,
        default: "rgb(0,0,0)"
    },
    //下降趋势的文字颜色
    downTextColor: {
        type: String,
        default: "rgb(0,0,0)"
    },
    //上升趋势显示的图标
    upIcon: {
        type: String,
        default: "ArrowUp"
    },
    //下降趋势显示的图标
    downIcon: {
        type: String,
        default: "ArrowDown"
    }
})

onMounted(() => {
    //如果传递了颜色反转
    if (props.reverseColor) {

    }
})

//文字颜色
const textColor = computed(() => {
    return props.type === "up" ? props.upTextColor : props.downTextColor
})



</script>
<style  scoped>
.trend {
    display: flex;
    align-items: center;
    height: 60px;
}

.text {
    font-size: 16px;
    margin-right: 4px;
}

svg {
    width: 2em;
    height: 2em;
}

.icon {
    svg {
        width: 0.8em;
        height: 0.8em;
    }
}
</style>