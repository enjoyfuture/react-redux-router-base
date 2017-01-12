const utils = require('../../helper/utils');
const global = require('../../global');

exports.persons = (req, data) => {
  return utils.remotePostJSON({
    url: global.apis.persons,
    data,
    req
  });
};
