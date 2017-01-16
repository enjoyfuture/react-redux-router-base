/**
 * Created by tanxiangyuan on 2016/11/24.
 */
const onFinished = require('on-finished');
module.exports.create = function (logger) {

  return function (req, res, next) {
    const start = process.hrtime();

    onFinished(res, (err, res1) => {
      const end = process.hrtime();
      const ms = ((end[0] - start[0]) * 1e3 + (end[1] - start[1]) * 1e-6).toFixed(3);
      // logger.info(`${req.method} ${decodeURIComponent(req.originalUrl || req.url)} ${res1.statusCode || undefined} ${ms} ms - ${res1['content-length']}`);
      //开了Gzip拿不到content-length
      logger.info(`${req.method} ${decodeURIComponent(req.originalUrl || req.url)} ${res1.statusCode || undefined} ${ms} ms`);
    });

    next();
  };
};