import test from 'ava';
import {browserHistory} from 'react-router';
import Immutable from 'immutable';
import sinon from 'sinon';
import {configureStore} from '../Root';

test('configureStore Test', t => {
  const reducer = sinon.spy();
  const store = configureStore(browserHistory, reducer, Immutable.fromJS({}));
  const methods = Object.keys(store);

  t.is(methods.length, 4);
  t.true(methods.indexOf('dispatch') !== -1);
  t.true(methods.indexOf('subscribe') !== -1);
  t.true(methods.indexOf('getState') !== -1);
  t.true(methods.indexOf('replaceReducer') !== -1);
  t.deepEqual(methods, ['dispatch', 'subscribe', 'getState', 'replaceReducer']);
});