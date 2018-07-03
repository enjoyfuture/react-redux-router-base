const { SERVER_URL } = process.env;

/**
 * 定义前端往后端发请求 api 对应关系
 * 一般情况下，直接使用 java 端定义的 url 即可
 * 如果想定义别名对应关系，可以在这里设置
 * 另外这里也定义了 api-ext 对应的 url 接口
 * @type {}
 */
const alias = {
  fileUpload: 'file-upload',
  fileDownload: 'file-download',
};

const handleApis = () => {
  const apis = {};
  Object.keys(alias).forEach(k => {
    apis[k] = `${SERVER_URL}${alias[k]}`;
  });
  return apis;
};

module.exports = handleApis();
