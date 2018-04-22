/**
 * 基础的工具方法
 * @type {request}
 */
const path = require('path');
const fs = require('fs');
const request = require('request'); // enable cookie
const logger = require('digger-node').Logger;
const multer = require('multer');
const {
  RES_CODE,
  RES_DATA,
  RES_MSG,
} = require('../common/constants');

const timeout = 10e3; // 请求服务端 10s 超时

/**
 * 格式化接口请求异常
 * @param options
 * @param netError
 * @returns {Error}
 */
const formatRequestError = (options, netError) => {
  let errMsg = '获取服务端接口异常';
  let errCode = 'S0001';
  if (netError && netError.code === 'ETIMEDOUT') {
    if (netError.connect === true) {
      errMsg += `[连接超时(${timeout}s)]`;
      errCode = 'S0002';
    } else {
      errMsg += `[响应超时(${timeout}s)]`;
      errCode = 'S0003';
    }
  }

  const err = new Error(`获取服务端接口异常，url：${options.url}${errMsg ? ` 后端返回错误信息：${errMsg}` : ''}`);
  err[RES_CODE] = errCode;
  return err;
};

/**
 * 记录接口耗时
 * @param start
 * @param url
 */
const logTimeUse = (start, url) => {
  const end = process.hrtime();
  logger.info(`【${url}】耗时${((end[0] - start[0]) * 1e3 + (end[1] - start[1]) * 1e-6).toFixed(3)}ms`);
};

/**
 * 构建请求头部
 * @param clientHeaders
 * @returns {{clientIp: *, X-Requested-With: string, cookie}}
 */
const buildHeader = (clientHeaders) => {
  return {
    'X-Requested-With': 'XMLHttpRequest',
    clientIp: clientHeaders.clientIp,
    cookie: clientHeaders.cookie,
  };
};

// 格式化 json 数据
const parseJSON = (str) => {
  if (!str) {
    return null;
  }
  let json = null;
  try {
    json = JSON.parse(str);
  } catch (e) {
    json = null;
    logger.warn(`JSON 格式不正确：${e.message}`);
  }
  return json;
};

// 把 json 数据转换为字符串
const stringifyJSON = (json, space = 2) => {
  let str = '';
  try {
    str = JSON.stringify(json, null, space);
  } catch (e) {
    str = '';
    logger.warn(`JSON 格式不正确：${e.message}`);
  }
  return str;
};

module.exports.parseJSON = parseJSON;
module.exports.stringifyJSON = stringifyJSON;

// 异步删除文件
const deleteFile = (filePaths) => {
  if (filePaths && filePaths.length > 0) {
    filePaths.forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          return logger.error(`删除临时文件失败： ${err.stack}`);
        }
        logger.log('删除临时文件成功！');
      });
    });
  }
};

/**
 * 抛出 response.resultCode !== 0 的数据
 * @param options
 */
module.exports.remotePostFormRejectError = (options) => {
  return remotePostForm(options).then((resp) => {
    if (!options.text && resp[RES_CODE] !== 0) {
      const error = new Error(resp[RES_MSG] || '服务端异常');
      error[RES_CODE] = resp[RES_CODE];
      error[RES_DATA] = resp[RES_DATA];
      return Promise.reject(error);
    }
    return Promise.resolve(resp);
  });
};

/**
 * post 提交 form 数据
 * @param options
 */
const remotePostForm = module.exports.remotePostForm = (options) => {
  const {
    url,
    data,
    req: {
      headers,
    },
  } = options;
  const requestHeaders = buildHeader(headers);

  logger.info(`POST请求地址:${url};请求参数:${stringifyJSON(data)}, 请求头:${stringifyJSON(requestHeaders)}, content-type:application/x-www-form-urlencoded.`);

  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    request.post({
      url,
      headers: requestHeaders,
      form: data || {},
      timeout,
    }, (err, response, body) => {
      logTimeUse(start, url);

      if (!err && response.statusCode === 200) {
        logger.info(`${url} =======返回数据========== \n ${stringifyJSON(body)}`);

        if (options.text === true) {
          resolve(body);
        } else {
          resolve(body && JSON.parse(body));
        }
      } else {
        if (err) {
          logger.error(`${url} =======错误==========  \n ${err.stack}`);
        }
        logger.error(`post:${url} error!${response && response.statusCode}`);
        logger.error(`error repsonse body is:${body}`);
        reject(formatRequestError(options, err));
      }
    });
  }).catch((error) => {
    logger.error(`post:${url} error!${error.stack}`);
    return Promise.reject(error);
  });
};

/**
 * post 提交 json 数据
 * @param options
 */
module.exports.remotePostJSON = (options) => {
  const {
    url,
    data,
    req: {
      headers,
    },
  } = options;
  const requestHeaders = buildHeader(headers);

  logger.info(`POST请求地址:${url};请求参数:${stringifyJSON(data)}, 请求头:${stringifyJSON(requestHeaders)}, content-type:application/json.`);

  return new Promise((resolve, reject) => {
    const start = process.hrtime();

    request.post({
        url,
        headers: requestHeaders,
        json: data || {},
        timeout,
      }, (err, response, body) => {
        logTimeUse(start, url);// 记录接口耗时

        if (!err && response.statusCode === 200) {
          logger.info(`${url} =======返回数据========== \n ${stringifyJSON(body)}`);
          resolve(body);
        } else {
          if (err) {
            logger.error(`${url} =======错误==========  \n ${err.stack}`);
          }
          logger.error(`post:${url} error!${response && response.statusCode}`);
          logger.error(`error repsonse body is:${body}`);
          reject(formatRequestError(options, body));
        }
      },
    );
  }).catch((error) => {
    logger.error(`post:${url} error!${error.stack}`);
    return Promise.reject(error);
  });
};

/**
 * get 获取 json 数据
 * @param options
 */
module.exports.remoteGetJSON = (options) => {
  let url;
  if (typeof options === 'string') {
    url = options;
    options = {};
  } else if (typeof options === 'object') {
    url = options.url;
  }

  const {
    data,
    req: {
      headers,
    },
  } = options;

  const requestHeaders = buildHeader(headers);

  logger.info(`GET请求地址:${url};请求参数:${stringifyJSON(data)}, 请求头:${stringifyJSON(requestHeaders)}, content-type:application/json`);

  return new Promise((resolve, reject) => {
    const start = process.hrtime();

    request.get(
      {
        url,
        json: data || {},
        headers: requestHeaders,
        timeout,
      },
      (err, response, body) => {
        logTimeUse(start, options.url); // 记录接口耗时

        if (!err && response.statusCode === 200) {
          logger.info(`${url} =======返回数据========== \n ${stringifyJSON(body)}`);
          resolve(body);
        } else {
          if (err) {
            logger.error(`${url} =======错误==========  \n ${err.stack}`);
          }
          logger.error(`post:${url} error!${response && response.statusCode}`);
          logger.error(`error repsonse body is:${body}`);
          reject(formatRequestError(options, body));
        }
      },
    );
  }).catch((error) => {
    logger.error(`get:${url} error!${error.stack}`);
    return Promise.reject(error);
  });
};

/**
 * 上传文件，上传后删除临时文件
 * formData 中除了包含文件流，还可以包含普通字段内容
 * @param options
 */
module.exports.fileUploadStream = (options) => {
  const {
    url,
    formData,
    req: {
      headers,
    },
    filePaths,
  } = options;

  const requestHeaders = buildHeader(headers);

  logger.info(`POST请求地址:${url};请求头:${stringifyJSON(requestHeaders)}`);

  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    request.post({
      url,
      formData,
      headers: requestHeaders,
      timeout,
      encoding: null, // 默认是 'utf-8'，因为是流，所以需要设为 null
    }, (err, response, body) => {
      logTimeUse(start, url);
      if (!err && response.statusCode === 200) {
        if (body && body instanceof Buffer) {
          // 删除临时文件
          deleteFile(filePaths);

          const bodyStr = body.toString('utf-8');
          const bodyJson = parseJSON(bodyStr);

          logger.info(`${url} =======返回数据========== \n ${bodyStr}`);

          resolve(bodyJson);
        } else {
          reject(formatRequestError(options, new Error('返回的数据流错误，上传文件失败！')));
        }
      } else {
        if (err) {
          logger.error(`${url} =======错误==========  \n ${err.stack}`);
        }
        logger.error(`post:${url} error!${response && response.statusCode}`);
        logger.error(`error repsonse body is:${body}`);
        reject(formatRequestError(options, err));
      }
    });
  }).catch((error) => {
    logger.error(`post:${url} error!${error.stack}`);
    // 删除临时文件
    deleteFile(filePaths);
    return Promise.reject(error);
  });
};

/**
 * 下载文件
 * @param options
 * @returns {*|Promise<any>}
 */
module.exports.fileDownloadStream = (options) => {
  const {
    url,
    data,
    req: {
      headers,
    },
  } = options;

  const requestHeaders = buildHeader(headers);

  logger.info(`POST请求地址:${url};请求头:${stringifyJSON(requestHeaders)}`);

  return new Promise((resolve, reject) => {
    const start = process.hrtime();

    request.post({
      url,
      json: data,
      headers: requestHeaders,
      timeout,
      encoding: null, // 默认是 'utf-8'，因为是流，所以需要设为 null
    }, (err, response, body) => {
      logTimeUse(start, url);

      if (!err && response.statusCode === 200) {
        if (body) {
          resolve(body instanceof Buffer ? body : Buffer.from(stringifyJSON(body, null)));
        } else {
          reject(formatRequestError(options, new Error('返回的数据流错误，下载文件失败！')));
        }
      } else {
        if (err) {
          logger.error(`${url} =======错误==========  \n ${err.stack}`);
        }
        logger.error(`post:${url} error!${response && response.statusCode}`);
        logger.error(`error repsonse body is:${body}`);
        reject(formatRequestError(options, err));
      }
    });
  }).catch((error) => {
    logger.error(`post:${url} error!${error.stack}`);
    return Promise.reject(error);
  });
};

/**
 * 返回客户端 ip
 * @param req
 * @returns {null}
 */
module.exports.getClientIP = (req) => {
  let ipAddress = req.get('X-Forwarded-For') ? req.get('X-Forwarded-For').split(',')[0] : req.get('X-Real-Ip');
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress || req.socket.remoteAddress;
  }

  return ipAddress;
};

/**
 * 返回上传文件 uploadFile
 */
module.exports.getUploadFile = () => {
  const storage = multer.diskStorage({
    // 设置上传后文件路径，uploads 文件夹会自动创建。
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },

    // 给上传文件重命名，获取添加后缀名
    filename: (req, file, cb) => {
      const fileFormat = (file.originalname).split('.');
      cb(null, `${file.fieldname}-${Date.now()}.${fileFormat[fileFormat.length - 1]}`);
    },
  });

  // 添加配置文件到 multer 对象。
  return multer({
    storage,
  });
};


// 首字母大写
module.exports.upperFirstLetter = (str) => {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substring(1);
};
