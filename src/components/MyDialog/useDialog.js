import { createApp, h } from "vue";
import MyDialog from "./index.vue";

// 需要用到h函数和render
// h函数：用来创建虚拟dom，把一个组件变成一个虚拟DOM（VNode）
// render函数：把虚拟DOM变成真实

export function useDialog(title, color) {
  const app = createApp({
    render() {
      return h(MyDialog, {
        title,
        color,
        onClose: () => {
          // 关闭后销毁应用实例
          app.unmount();
        }
      });
    }
  });

  // 挂载到一个 DOM 元素（比如 body）
  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
}
