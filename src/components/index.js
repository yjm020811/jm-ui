// 引入项目中的全部全局组件
import chooseArea from "./chooseArea/index.vue";
import chooseIcon from "./chooseIcon/index.vue";
import menus from "./menus/index.vue";
import MyDialog from "./MyDialog/index.vue";
import MyTable from "./MyTable/index.vue";
import notification from "./notification/index.vue";
import myProgress from "./myProgress/index.vue";
import toDoList from "./toDoList/index.vue";
import trend from "./trend/index.vue";
import svgIcon from "./svgIcon/index.vue";
import myUpload from "./myUpload/index.vue";

// 全局组件对象
const allGlobalComponents = {
  chooseArea,
  chooseIcon,
  menus,
  MyDialog,
  MyTable,
  notification,
  myProgress,
  toDoList,
  trend,
  svgIcon,
  myUpload
};

// 全局注册组件
export default {
  // 务必叫做install方法
  install(app) {
    //注册项目
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
  }
};
