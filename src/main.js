import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { toLine } from "./utils/index";

const app = createApp(App);
//全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon${toLine(key)}`, component);
  // console.log(`el-icon${toLine(key)}`);
  //   console.log(component);
}

// 注册整个项目的全局组件
// 1.引入全局注册的自定义插件
import globalComponent from "./components/index";
//2.安装这个插件
app.use(globalComponent);

// svg插件配置项
import "virtual:svg-icons-register";

app.use(router).use(ElementPlus).mount("#app");
