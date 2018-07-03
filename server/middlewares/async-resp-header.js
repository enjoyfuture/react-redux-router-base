/**
 * Created by tanxiangyuan on 2017/3/17.
 */
/**
 * 异步请求，响应头设置,不缓存
 * @param req
 * @param res
 * @param next
 */

module.exports = function(req, res, next) {
  if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    res.setHeader('content-type', 'application/json; charset=UTF-8');
  }
  next();
};
