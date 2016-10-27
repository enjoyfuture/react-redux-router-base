const SERVER_URL = process.env.SERVER_URL;
const global = {};

global.apis = {
  personList: `${SERVER_URL}/personList`,
};

export default global;