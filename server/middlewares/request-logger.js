/**
 * Created by tanxiangyuan on 2016/11/24.
 */

const onFinished = require('on-finished');

module.exports.create = function(logger) {
  return function(req, res, next) {
    const start = process.hrtime();

    onFinished(res, (error, res1) => {
      const end = process.hrtime();
      const ms = (
        (end[0] - start[0]) * 1e3 +
        (end[1] - start[1]) * 1e-6
      ).toFixed(3);

      let url = req.originalUrl || req.url;
      try {
        url = decodeURIComponent(url);
      } catch (e) {
        logger.error(e);
      }

      // 开了 Gzip 拿不到 content-length
      const log = `${req.method} ${url} ${res1.statusCode ||
        undefined} ${ms} ms`;

      // nginx 会发定时 Head 请求，监测系统健康状况，把这部分请求降级
      if (req.method === 'HEAD') {
        logger.debug(log);
      } else {
        logger.info(log);
        if (req.path === '/') {
          logger.info(`request headers:[${JSON.stringify(req.headers)}]`);
        }
      }
    });

    next();
  };
};
