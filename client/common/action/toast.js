
// 设置 toast，包括内容和样式
export function setToast({content = '', effect = 'enter', time = 3000}) {
  return {
    type: 'set_toast',
    content,
    effect,
    time,
  };
}

// 清空 toast，这里只是修改了效果，没有清空内容
export function clearToast(effect = 'leave') {
  return {
    type: 'clear_toast',
    effect
  };
}
