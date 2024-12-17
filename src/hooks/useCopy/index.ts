//复制的hooks
import { ElMessage } from "element-plus";
export const useCopy = (text) => {
  //创建输入框
  var textArea = document.createElement("textarea");
  //给输入框value赋值
  textArea.value = text;
  //追加到body里面去
  document.body.appendChild(textArea);
  //选择输入框的操作
  textArea.select();
  //执行复制的操作
  document.execCommand("copy");
  //删除加入的输入框
  document.body.removeChild(textArea);
  //提示用户
  ElMessage({
    message: "复制成功",
    type: "success",
  });
};
