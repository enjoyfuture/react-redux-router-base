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

let formatter = function(args) {
    let date = moment().format('YY-MM-DD.HH:mm:ss.SSS'),
        level = args.level,
        ip = localIp.address(),
        msg = args.message,
        location = args.meta.location;
    return `${date} [${ip}_${process.pid}] ${level.toUpperCase()} ${location} - ${msg}`;
};
let consoleFormatter = function(args) {
    let date = moment().format('YY-MM-DD.HH:mm:ss.SSS'),
        level = args.level,
        ip = localIp.address(),
        msg = args.message,
        location = args.meta.location;
    return `${date} ${location} - ${msg}`;
};
/**
 * 获取异常文件路径和行号
 * @param deepth
 * @param appName
 * @returns {string} 如：bin_www_91_21
 * @private
 */
let _getCallerFile = function(deepth, appName) {
    return _getPositionFromStack((new Error()).stack.replace(/\\/g, '/'),deepth,appName);
};

/**
 * 获取日志调用位置
 * 样本数据：
 Error
 at _getCallerFile (/export/package/credit-front-m-node-product-20170113T1204/server/helper/mylogger.js:56:18)
 at log (/export/package/credit-front-m-node-product-20170113T1204/server/helper/mylogger.js:104:19)
 at Object.debug (/export/package/credit-front-m-node-product-20170113T1204/server/helper/mylogger.js:115:9) <a定位到这里>
 at Array.onFinished (/export/package/credit-front-m-node-product-20170113T1204/server/middlewares/request-logger.js:17:24) <b定位到这里>
 at listener (/export/package/credit-front-m-node-product-20170113T1204/node_modules/on-finished/index.js:169:15)
 at onFinish (/export/package/credit-front-m-node-product-20170113T1204/node_modules/on-finished/index.js:100:5)
 at callback (/export/package/credit-front-m-node-product-20170113T1204/node_modules/ee-first/index.js:55:10)
 at ServerResponse.onevent (/export/package/credit-front-m-node-product-20170113T1204/node_modules/ee-first/index.js:93:5)
 at emitNone (events.js:91:20)
 at ServerResponse.emit (events.js:185:7)

 * @param stack
 * @param deepth
 * @param appName
 * @returns {string}如：bin_www_91_21
 */
let _getPositionFromStack = function(stack, deepth, appName) {

    // console.log(stack);

    let a = stack.indexOf('\n', 5);//定位到Error后面的换行符

    if (isNaN(deepth) || deepth < 0) deepth = 1;
    deepth += 1;

    while (deepth--) {//往下找3个换行符
        a = stack.indexOf('\n', a + 1);
        if (a < 0) {//如果日志堆栈不足3行，定位到最后一行的上一个换行符
            a = stack.lastIndexOf('\n', stack.length);
            break;
        }
    }
    let b = stack.indexOf('\n', a + 1);//定位a后面的一个换行符
    if (b < 0) b = stack.length;
    if (appName) {//在后面寻找appName所在位置
        let _temp = stack.indexOf(appName, a);
        if(_temp == -1){
            _temp = stack.indexOf('(', a);
        }
        a = _temp;
    } else {
        a = stack.indexOf('(', a);
    }
    a = Math.max(stack.indexOf('/', a), a) + 1;//查找appName结束的位置
    let closestQuo = stack.indexOf(')',a);
    if(closestQuo < b){
        b = closestQuo;
    }
    stack = stack.substring(a, b);
    return stack ? stack.replace(/\//g, '.').replace(/\:|-/g, '_') : stack;
};
let wLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            name: 'console-log',
            formatter: formatter,
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
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

const log = function(level, msg) {
    let logInfo = {
        location: _getCallerFile(2, process.env.appName || undefined),
    };

    wLogger.log(level, msg, logInfo);
};

module.exports.Logger = {
    log: function(msg) {
        log('debug', msg);
    },
    debug: function(msg) {
        log('debug', msg);
    },
    info: function(msg) {
        log('info', msg);
    },
    error: function(msg) {
        log('error', msg);
    },
    profile: function(tag) {
        wLogger.profile(tag, {
            location: _getCallerFile(2, process.env.appName || undefined),
        });
    }
};