//把驼峰转换为横杠连接
export const toLine = (value) => {
  return value.replace(/([A-Z])/g, "-$1").toLowerCase();
};
