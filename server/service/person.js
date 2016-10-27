const utils = require('../helper/utils');
const global = require('../global');

exports.list = function (currentPage) {
  return utils.remoteGetJSON({
    url: global.apis.personList,
    data: {
      currentPage
    }
  });
};
