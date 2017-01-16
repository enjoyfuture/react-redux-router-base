const utils = require('../helper/utils');
const global = require('../global');

exports.list = (req, data) => {
  return utils.remotePostJSON({
    url: global.apis.list,
    data,
    req
  });
};
