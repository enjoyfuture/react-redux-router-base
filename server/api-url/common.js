
const {serverUrl} = require('../config');

const apiUrl = {
  fileUpload: `${serverUrl}file-upload`,
  fileDownload: `${serverUrl}file-download`,
};

module.exports = apiUrl;
