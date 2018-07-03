/**
 * Created by tanxiangyuan on 2017/4/13.
 */

const helmet = require('helmet');

module.exports = function(app) {
  app.use(helmet());
  app.use(helmet.noCache());
  app.use(helmet.frameguard());
};
