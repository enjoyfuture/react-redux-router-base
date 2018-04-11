// Hello World
export function hello(content = '') {
  return {
    type: 'home-hello',
    content,
  };
}

// 清空内容
export function clearHello() {
  return {
    type: 'home-clear-hello'
  };
}

// home route
export function homeRoute(content) {
  return {
    type: 'home-route',
    content
  };
}
