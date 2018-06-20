export default options => {
  options = options || {};
  options.headers = {};
  options.headers.accept = 'application/json';
  options.headers['content-type'] = 'application/json; charset=utf-8';

  return options;
};
