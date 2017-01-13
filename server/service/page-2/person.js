const utils = require('../../helper/utils');
const global = require('../../global');

exports.paging = (req, pageNum) => {
  return utils.remoteGetJSON({
    url: `${global.apis.personPaging}?pageNum=${pageNum}`,
    req
  });
};

exports.removePerson = (req, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true
      });
    }, 300);
  });
};

exports.savePerson = (req, data) => {
  return utils.remotePostJSON({
    url: global.apis.personSave,
    data,
    req
  });
};
