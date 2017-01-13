const SERVER_URL = process.env.SERVER_URL;
const global = {};

global.apis = {
  personPaging: `${SERVER_URL}person/paging`,
  personSave: `${SERVER_URL}person/save`,
  filmAll: `${SERVER_URL}film/all`,
  filmPopularity: `${SERVER_URL}film/popularity`,
};

module.exports = global;