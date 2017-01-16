// Hello World
export function hello(content = '') {
  return {
    type: 'home-hello',
    content,
  };
}

export function clearHello() {
  return {
    type: 'home-clear-hello'
  };
}
