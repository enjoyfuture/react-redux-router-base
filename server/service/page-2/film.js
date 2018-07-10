const utils = require('../../helper/utils');
const apiUrls = require('../../api-url/page-2');

const { upperFirstLetter } = utils;
exports.filmList = (req, type) =>
  utils.remoteGetJSON({
    url: apiUrls[`film${upperFirstLetter(type)}`],
    req,
  });
