const utils = require('../helper/utils');
const apiUrls = require('../api-url/page-1');

exports.list = (req, data) => {
  return utils.remotePostJSON({
    url: apiUrls.list,
    data,
    req
  });
};
