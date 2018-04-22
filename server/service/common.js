const utils = require('../helper/utils');
const apiUrls = require('../api-url/common');

// 文件下载
exports.fileDownload = (req, data) => {
  return utils.fileDownloadStream({
    url: apiUrls.fileDownload,
    data,
    req,
  });
};

// 文件上传
exports.fileUpload = (req, formData, filePaths) => {
  return utils.remotePostFileStream({
    url: apiUrls.fileUpload,
    formData,
    filePaths,
    req,
  });
};
