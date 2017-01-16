const utils = require('../../helper/utils');
const global = require('../../global');

const {upperFirstLetter} = utils;
exports.filmList = (req, type) => {
  return utils.remoteGetJSON({
    url: global.apis[`film${upperFirstLetter(type)}`],
    req
  });
};
