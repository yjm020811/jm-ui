import { chooseArea } from "./index.vue";

//让这个组件可以通过use的形式使用
export default {
  install() {
    app.component("jm-choose-area", chooseArea);
  },
};
