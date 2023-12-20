<template>
  <div>
    <div class="flex">
      <h1 class="title">趋势标记</h1>
      <div class="simple">
        <div>
          <!-- 注意，父组件给子组件传递具体的值不需要冒号，
                如果传递的值是data中的值就需要加冒号 -->
          <trend text="今日挣取"></trend>
        </div>
        <div>
          <trend text="今日消费" type="down"></trend>
        </div>
      </div>
      <h1 class="title">颜色的改变</h1>
      <div class="reverse">
        <div>
          <trend text="今日挣取" :reverseColor="true"></trend>
        </div>
        <div>
          <trend text="今日消费" type="down" :reverseColor="true"></trend>
        </div>
      </div>
      <h1 class="title">文字颜色的改变</h1>
      <div class="reverse">
        <div>
          <trend text="今日挣取" upTextColor="blue"></trend>
        </div>
        <div>
          <trend text="今日消费" type="down" downTextColor="yellow"></trend>
        </div>
      </div>
      <h1 class="title">自定义图标</h1>
      <div class="reverse">
        <div>
          <trend text="今日挣取" upIcon="Sunset"></trend>
        </div>
        <div>
          <trend
            text="今日消费"
            type="down"
            downIcon="Food"
            downIconColor="red"
          ></trend>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.simple,
.reverse {
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  height: 60px;
  background-color: #eee;
  margin-top: 20px;
}

.title {
  width: 80%;
  margin: auto;
  padding-top: 20px;
}
</style>
