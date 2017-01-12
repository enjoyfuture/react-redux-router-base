const SERVER_URL = process.env.SERVER_URL;
const global = {};

global.apis = {
  list: `${SERVER_URL}list`,
  persons: `${SERVER_URL}list`,
};

module.exports = global;