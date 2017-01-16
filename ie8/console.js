// Avoid `console` errors in environments that lack a console.
/*eslint-disable*/
var method;
var noop = function () {};
var methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeStamp', 'trace', 'warn'
];
var length = methods.length;

while (length--) {
  method = methods[length];

  if (window.console === undefined || window.console[method] === undefined) {
    window.console = {};
    window.console[method] = noop;
  }
}