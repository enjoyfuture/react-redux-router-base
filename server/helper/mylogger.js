/**
 * 服务端的日志封装
 *   提供统一日志入口，满足统一日志格式要求
 * how to use ?
 * const logger = require('/path/to/mylogger').Logger;
 *
 * Created by tanxiangyuan on 2016/12/20.
 */
const winston = require('winston');
const path = require('path');
const moment = require('moment');
const localIp = require('ip');
const fs = require('fs-extra');
require('winston-daily-rotate-file');

// const logFileName = process.env.logFileName || './logs/detail.log';
// const logFilePath = logFileName.substring(0, logFileName.lastIndexOf('/'));
// fs.mkdirsSync(logFilePath);//mkdir -p

const formatter = function (args) {
  const date = moment().format('YY-MM-DD.HH:mm:ss.SSS'),
    {level} = args,
    ip = localIp.address(),
    msg = args.message,
    {location} = args.meta;
  return `${date} [${ip}_${process.pid}] ${level.toUpperCase()} ${location} - ${msg}`;
};

const consoleFormatter = function (args) {
  const date = moment().format('YY-MM-DD.HH:mm:ss.SSS'),
    msg = args.message,
    {location} = args.meta;
  return `${date} ${location} - ${msg}`;
};

/**
 * 获取异常文件路径和行号
 * 异常stack样例：
 * Error
 at _getCallerFile (${projectName}/server/helper/mylogger.js:21:18)
 at Logger.log (${projectName}/server/helper/mylogger.js:67:19)
 at Logger.info (${projectName}/server/helper/mylogger.js:81:10)
 at Server.onListening (${projectName}/bin/www:91:12)
 at emitNone (events.js:86:13)
 at Server.emit (events.js:185:7)
 at emitListeningNT (net.js:1283:10)
 at _combinedTickCallback (internal/process/next_tick.js:71:11)
 at process._tickCallback (internal/process/next_tick.js:98:9)
 at Timeout.Module.runMain [as _onTimeout] (module.js:606:11)
 at ontimeout (timers.js:365:14)
 at tryOnTimeout (timers.js:237:5)
 at Timer.listOnTimeout (timers.js:207:5)
 * @param deepth
 * @param appName
 * @returns {string} 如：bin_www_91_21
 * @private
 */
const _getCallerFile = function (deepth, appName) {
  if (isNaN(deepth) || deepth < 0) {
    deepth = 1;
  }
  deepth += 1;
  let stack = (new Error()).stack.replace(/\\/g, '/'), a = stack.indexOf('\n', 5);
  while (deepth--) {
    a = stack.indexOf('\n', a + 1);
    if (a < 0) {
      a = stack.lastIndexOf('\n', stack.length);
      break;
    }
  }
  let b = stack.indexOf('\n', a + 1);
  if (b < 0) b = stack.length;
  let endStr = '/';
  if (appName) {
    endStr += `${appName}/`;
  }
  a = Math.max(stack.lastIndexOf(' ', b), stack.lastIndexOf(endStr, b) + endStr.length);
  b = stack.lastIndexOf(')', b);
  stack = stack.substring(a, b);
  return stack ? stack.replace(/:|\//g, '_').replace(/\n|\s/g, '') : stack;
};

const wLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'console-log',
      formatter,
      level: process.env.ENV === 'development' ? 'debug' : 'info',
      json: false
    })/*,
     new winston.transports.DailyRotateFile({
     name: 'all',
     filename: process.env.logFileName || './logs/detail.log',
     maxsize: 1024 * 1024 * 10,
     datePattern: '.yyyyMMdd',
     formatter: formatter,
     json: false,
     level: process.env.ENV === 'development' ? 'debug' : 'info'
     })*/
  ]
});


// if (process.env.NODE_ENV == 'product') {//产品环境删除console日志
//     wLogger.remove('console-log');
// }

const log = function (level, msg) {
  const logInfo = {
    location: _getCallerFile(2, process.env.APP_NAME || undefined),
  };

  wLogger.log(level, msg, logInfo);
};

module.exports.Logger = {
  log (msg) {
    log('debug', msg);
  },
  debug (msg) {
    log('debug', msg);
  },
  info (msg) {
    log('info', msg);
  },
  error (msg) {
    log('error', msg);
  },
  profile (tag) {
    wLogger.profile(tag, {
      location: _getCallerFile(2, process.env.APP_NAME || undefined),
    });
  }
};
