const utils = require('../helper/utils');
const global = require('../global');

exports.list = function () {
  return utils.remoteGetJSON(global.apis.personList);
};
