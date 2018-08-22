const { SERVER_URL } = require('../config');

const apiUrl = {
  fileUpload: `${SERVER_URL}file-upload`,
  fileDownload: `${SERVER_URL}file-download`,
};

module.exports = apiUrl;
