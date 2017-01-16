import test from 'ava';
import callApi from '../fetch';
import nock from 'nock';

const SERVER_URL = 'http://localhost:8888/context/api/';

test('method defaults to GET', t => {
  const data = [];
  let i = 5;
  while (i--) {
    data.push({
      id: '410000201204221401',
      link: 'prospero://dmehonku.bb/lwbnvtioi',
      name: '637D(i'
    });
  }
  const reply = {
    success: true,
    data
  };
  nock(SERVER_URL)
    .get('/page-2/film/all')
    .reply(200, reply);
  return callApi({url: `${SERVER_URL}page-2/film/all`}).then(res => {
    //因为模拟数据不固定，所以不能直接简单的使用 t.deepEqual(res, reply);
    t.is(res.success, reply.success);
    t.is(res.data.length, reply.data.length);
    t.true(res.data[0].id !== null);
    t.true(res.data[0].link.indexOf('://') !== -1);
    t.true(res.data[0].name !== null);
  });
});

test('method defaults to POST', t => {
  const body = {
    firstName: 'zhang',
    lastName: 'san',
    id: null
  };
  const reply = {
    success: true,
    data: {id: 'fBf2FFfA-b5fB-9Eb8-Bf3B-3EE914F66713', firstName: 'zhang', lastName: 'san'}
  };
  nock(SERVER_URL)
    .post('/page-2/person', body)
    .reply(200, reply);
  return callApi({url: `${SERVER_URL}page-2/person`, method: 'post', body}).then(response => {
    t.deepEqual(response, reply);
  });
});

test('returns the 404 error', t => {
  const reply = new Error('Not Found');
  reply.errorCode = 404;
  nock(SERVER_URL)
    .get('/send_error')
    .reply(404, reply);
  return callApi({url: `${SERVER_URL}send_error`}).catch(error => {
    t.deepEqual(error, reply);
  });
});

test('returns {success: false} error', t => {
  const reply = new Error('获取数据出错');
  reply.errorCode = undefined;
  nock(SERVER_URL)
    .delete('/page-2/person', {})
    .reply(200, reply);
  return callApi({url: `${SERVER_URL}page-2/person`, method: 'delete'}).catch((error) => {
    t.deepEqual(error, reply);
  });
});

test('not pass by url error', t => {
  t.throws(callApi({}), '请传入 url');
});
