
// 显示 Toast，time 指毫秒
export function openToast(content = '', time = 0) {
  return {
    type: 'open-toast',
    content,
    time,
  };
}

//  隐藏 Toast，这里没有清空内容
export function closeToast(content) {
  return {
    type: 'close-toast',
    content
  };
}
