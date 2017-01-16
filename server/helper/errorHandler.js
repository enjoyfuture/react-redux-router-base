//定义错误 code
const errorCode = {
  '001': '连接失败，请稍后重试',
};

module.exports = (error, errorMsg) => {
  if (errorMsg) {
    return errorMsg;
  }
  if (error.code && errorCode[error.code]) {
    return errorCode[error.code];
  }

  return error.message || '请求失败';
};
