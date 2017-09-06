const win = window;
const ua = win.navigator.userAgent;

// 各种设备判断，后续根据需要再加入
export const isWx = ua.search(/micromessenger/ig) !== -1; // 微信
export const isIos = ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1; // ios 系统
export const isAndroid = ua.indexOf('Android') !== -1; // Android 系统
export const isJdApp = ua.indexOf('jdapp') !== -1; // 京东 app
export const isMobile = isIos || isAndroid; // 手机端
export const isPc = !isMobile; // pc 端

