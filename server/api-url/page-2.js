const { serverUrl } = require('../config');

const apiUrl = {
  list: `${serverUrl}list`,
  personPaging: `${serverUrl}person/paging`,
  personSave: `${serverUrl}person/save`,
  filmAll: `${serverUrl}film/all`,
  filmPopularity: `${serverUrl}film/popularity`,
};

module.exports = apiUrl;
