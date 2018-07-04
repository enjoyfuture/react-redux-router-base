const utils = require('../helper/utils');
const apiUrls = require('../api-url/page-1');

exports.syncList = (req, data) =>
  new Promise((resolve, reject) => {
    const result = [];
    utils
      .remotePostJSON({
        url: apiUrls.list1,
        data,
        req,
      })
      .then(body => {
        result.push(body);
        return utils.remotePostJSON({
          url: apiUrls.list2,
          data,
          req,
        });
      })
      .then(body => {
        result.push(body);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });

exports.asyncList = req =>
  Promise.all([
    utils.remotePostJSON({
      url: apiUrls.list1,
      req,
    }),
    utils.remotePostJSON({
      url: apiUrls.list2,
      req,
    }),
  ]).then(([body1, body2]) => {
    const body = {
      body1,
      body2,
    };
    return Promise.resolve(body);
  });
