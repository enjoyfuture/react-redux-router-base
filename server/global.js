const {SERVER_URL} = process.env;
const global = {};

global.apis = {
  page1List: `${SERVER_URL}page1/list`,
  personPaging: `${SERVER_URL}person/paging`,
  personSave: `${SERVER_URL}person/save`,
  filmAll: `${SERVER_URL}film/all`,
  filmPopularity: `${SERVER_URL}film/popularity`,
};

module.exports = global;
