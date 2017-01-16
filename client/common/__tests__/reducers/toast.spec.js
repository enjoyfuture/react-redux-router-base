import test from 'ava';
import Immutable, {Map} from 'immutable';
import {setToast, clearToast} from '../../action/toast';
import toast from '../../reducers/toast';

test('action for setToast is working',
  t => {
    const action = setToast({content: 'Toast Test'});
    const stateAfter = Map({content: 'Toast Test', effect: 'enter', time: 3000});
    t.true(Immutable.is(toast(undefined, action), stateAfter))
  }
);

test('action for setToast is working, the case: "error param"', t => {
  return t.true(Immutable.is(toast(Map(), {error: 'Error Message'}),
    Map({content: 'Error Message', effect: 'enter', time: 3000})))
});

test('action for setToast is working, the case: the default value', t => {
  return t.true(Immutable.is(toast(undefined, {}),
    Map()))
});

test('action for clearToast is working',
  t => {
    t.true(Immutable.is(toast(Map(), clearToast()), Map({effect: 'leave'})));
  }
);
