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

app.use(router).use(ElementPlus).mount("#app");
