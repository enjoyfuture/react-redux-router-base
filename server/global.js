const SERVER_URL = process.env.SERVER_URL;
const global = {};

global.apis = {
  personList: `${SERVER_URL}person/list`,
};

module.exports = global;