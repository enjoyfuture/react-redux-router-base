// utils 函数

const win = window;
const doc = document;
const loc = doc.location;

const docEl = doc.documentElement;
const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';

/**
 * 根据设备大小自动调整 html font-size 字体大小
 * 字体按浏览器默认 16px 来计算，初始大小以 iPhone 6 为基准
 * designWidth 设计稿宽度
 * fontSize 默认字体大小
 */
export const adjustFontSize = (designWidth = 375, fontSize = 16) => {
  function recalc() {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    // 超过 600 不再处理
    if (clientWidth > 600) {
      clientWidth = 600;
    }
    docEl.style.fontSize = `${fontSize * (clientWidth / designWidth)}px`;
  }

  if (doc.addEventListener) {
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
};

/**
 * 获得地址栏传递参数
 * @returns {null}
 */
export const getLocationParams = () => {
  let { search } = loc;
  if (search.length > 1) {
    const params = {};
    search = search.substring(1);
    search.split('&').forEach(item => {
      const tempParam = item.split('=');
      params[tempParam[0]] =
        tempParam[1] === '' ? null : decodeURIComponent(tempParam[1]);
    });
    return params;
  }
  return null;
};

/**
 * 返回 location.origin, 例如： http://www.example.com:9090
 * @returns {string}
 */
export const getLocationOrigin = () => {
  if (loc.origin) {
    return loc.origin;
  }
  return `${loc.protocol}//${loc.host}`;
};

/**
 * 返回根路径，例如 http://www.example.com:9090/context/
 * @returns {*}
 */
export const getLocationRoot = () => {
  const { pathname, origin } = loc;
  const [root] = pathname.match(/\/[\w\d-]+\//);
  return origin + root;
};

/**
 * 返回上下文路径，例如 /context/
 * @returns {*}
 */
export const getLocationContext = () => loc.pathname.match(/\/[\w\d-]+\//)[0];

// 格式化 json 数据
export const parseJSON = str => {
  if (!str) {
    return null;
  }
  let json = null;
  try {
    json = JSON.parse(str);
  } catch (e) {
    json = null;
    console.warn(`JSON 格式不正确：${e.message}`);
  }
  return json;
};

// 把 json 数据转换为字符串
export const stringifyJSON = (json, space = null) => {
  let str = null;
  try {
    str = JSON.stringify(json, null, space);
  } catch (e) {
    str = null;
    console.warn(`JSON 格式不正确：${e.message}`);
  }
  return str;
};

/**
 * 标准创建时间格式 new Date(y, m, d, h, M, s, ms)
 * 如果对于时间格式比较复杂的情况，可参考 Moment 库 http://momentjs.com/
 *
 * @param input 支持 yyyy-MM-dd HH:mm:ss.SSS 或 yyyy-MM-dd HH:mm:ss:SSS 或 yyyy/MM/dd HH:mm:ss.SSS
 * 2016-06-02 13:01:50.333  2016-06-02 13:01:50:333 2016/06/02 13:01:50:333
 * 标准写法为 2016-06-02T05:01:50.333Z
 * @returns {Date}
 */
export const createDate = input => {
  if (!input || typeof input !== 'string') {
    return null;
  }
  let y = 0;

  let m = 0;

  let d = 0;

  let h = 0;

  let M = 0;

  let s = 0;

  let ms = 0;
  const inputs = input.replace(/\//g, '-').split(' ');
  if (inputs.length > 0) {
    const ymd = inputs[0].split('-');
    y = Number(ymd[0]);
    m = Number(ymd[1]) - 1;
    d = Number(ymd[2]);
  }
  if (inputs.length === 2) {
    const hms = inputs[1].split(':');
    h = Number(hms[0]);
    M = Number(hms[1]);
    // 格式 2016-06-02 13:01:50.333
    const sms = hms[2].split('.');
    if (sms.length === 2) {
      s = Number(sms[0]);
      ms = Number(sms[1]);
    } else {
      s = Number(hms[2]);
    }
    // 格式 2016-06-02 13:01:50:333
    if (hms[3]) {
      /* eslint-disable prefer-destructuring */
      ms = hms[3];
    }
  }
  return new Date(y, m, d, h, M, s, ms);
};

/**
 * 时间格式转换
 * @param time
 * @param showMs 是否显示毫秒
 * @param showYear 是否显示年
 * @param shortYear 短格式年
 * @returns {*}
 */
/* eslint-disable prefer-template */
export const formatDate = ({
  time,
  showMs = false,
  showTime = true,
  showYear = true,
  shortYear = false,
}) => {
  if (!time) {
    return '';
  }

  let date = time;

  if (!(time instanceof Date)) {
    date = new Date(Number(time));
    // 在 ios 下需要显式的转换为字符串
    if (date.toString() === 'Invalid Date') {
      date = createDate(time);
      if (date.toString() === 'Invalid Date') {
        return '';
      }
    }
  }

  const H = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
  const M =
    date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
  const S =
    date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();
  let MS = date.getMilliseconds();
  if (MS <= 9) {
    MS = '00' + MS;
  } else if (MS <= 99) {
    MS = '0' + MS;
  }

  const hms = showMs ? ` ${H}:${M}:${S}.${MS}` : ` ${H}:${M}:${S}`;
  let year = date.getFullYear();
  if (shortYear) {
    year %= 100;
    if (year < 10) {
      year = '0' + year;
    }
  }

  let month = date.getMonth() + 1;
  month = month <= 9 ? '0' + month : month;

  let day = date.getDate();
  day = day <= 9 ? '0' + day : day;

  return (
    (showYear ? year + '-' : '') + month + '-' + day + (showTime ? hms : '')
  );
};

/**
 *  格式化剩余时间
 */
export const formatRemainingTime = remainingTime => {
  let time = Number(remainingTime);
  /* eslint-disable no-restricted-globals */
  if (isNaN(time)) {
    return {};
  }

  const day = Math.floor(time / 86400); // 3600 * 24
  time %= 86400;
  const hour = Math.floor(time / 3600);
  time %= 3600;
  const minute = Math.floor(time / 60);
  const second = time % 60;

  return { day, hour, minute, second };
};

/**
 * 判断样式在浏览器中是否支持
 * @param styleProp
 * @returns {boolean}
 */
export const styleSupport = styleProp => {
  const prefix = ['webkit', 'moz', 'ms', 'o'];
  const $el = document.createElement('div');
  const styleText = $el.style;
  if (styleText[styleProp] !== undefined) {
    return true;
  }

  for (let i = 0; i < prefix.length; i++) {
    const _styleProp =
      prefix[i] + styleProp[0].toUpperCase() + styleProp.substring(1);
    if (styleText[_styleProp] !== undefined) {
      return true;
    }
  }
  return false;
};

// 小数转换为百分比数
export const toPercentNum = (num, percent) => {
  const _num = Number(num);
  if (isNaN(_num)) {
    return percent ? '%' : '';
  }
  return (_num * 100).toFixed(2) + (percent ? '%' : '');
};

// 小数转换为百分比数
export const toPercent = num => toPercentNum(num, true);

/**
 * 把金额转换为千分位表示
 * @param num 数值
 * @param hundredThousand 是否格式为万元
 * @param fixed 小数点保留位数
 * @returns {*}
 */
export const thousands = (num, fixed = 2, hundredThousand) => {
  let _num = Number(num);
  let _hundredThousand = hundredThousand;
  let _fixed = fixed;

  if (isNaN(_num) || !isFinite(_num)) {
    // 如果 NaN或者不是Finite 返回 ''
    return '';
  }
  if (typeof fixed === 'boolean') {
    _hundredThousand = fixed;
    _fixed = 2;
  }
  // 如果单位是万元，则除以 10000
  if (_hundredThousand) {
    _num /= 10000;
  }

  const n = num.toFixed(_fixed || 2);
  const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;

  if (_fixed === 0) {
    const a = n.replace(re, '$1,').split('.');
    return a[0];
  }
  return n.replace(re, '$1,');
};

/**
 * 字符串或数字比较
 * 返回-1 正序，返回 1 倒序，val1 小于 val2 是正序
 * @param val1
 * @param val2
 * @param comparer 比较器，首先处理值
 * @returns {number}
 */
export const compare = (val1, val2, comparer) => {
  if (val1 === val2) {
    return 0;
  }
  let _val1 = val1;
  let _val2 = val2;

  if (comparer && typeof comparer === 'function') {
    _val1 = comparer(val1);
    _val2 = comparer(val2);
  }
  const aType = typeof _val1;
  const bType = typeof _val2;
  if (aType === 'number' && bType === 'number') {
    return _val1 - _val2;
  }
  if (aType === 'string' && bType === 'string') {
    const arr1 = [_val1, _val2];
    const arr2 = [_val1, _val2].sort();
    return arr1[0] === arr2[0] ? -1 : 1;
  }
  if (aType === 'number') {
    // 如果 a 是数字，则返回 -1
    return -1;
  }
  return 1;
};
