import test from 'ava';
import errorHandler from '../errorHandler';

test('ErrorHandler Test: 500 error', t => {
  const error = new Error();
  error.errorCode = 500;
  const message = errorHandler(error);
  t.is(message, '服务器出错');
});

test('ErrorHandler Test: using errorMsg', t => {
  const error = new Error();
  const errorMsg = '自定义错误';
  const message = errorHandler(error, errorMsg);
  t.is(message, errorMsg);
});

test('ErrorHandler Test: using errorMapping', t => {
  const error = new Error('failed to fetch');
  const message = errorHandler(error);
  t.is(message, '无网络连接，请检查您的网络！');
});

test('ErrorHandler Test: using error.message', t => {
  const error = new Error('error.message');
  const message = errorHandler(error);
  t.is(message, 'error.message');
});