import test from 'ava';
import Immutable, {Map} from 'immutable';
import {openToast, closeToast} from '../../action/toast';
import toast from '../../reducers/toast';

test('action for setToast is working',
  t => {
    const action = openToast('Toast Test');
    const stateAfter = Map({content: 'Toast Test', open: true, time: 0});
    t.true(Immutable.is(toast(undefined, action), stateAfter))
  }
);

test('action for setToast is working, the case: "error param"', t => {
  return t.true(Immutable.is(toast(Map(), {error: 'Error Message'}),
    Map({content: 'Error Message', open: true, time: 3000})))
});

test('action for setToast is working, the case: the default value', t => {
  return t.true(Immutable.is(toast(undefined, {}),
    Map()))
});

test('action for clearToast is working',
  t => {
    t.true(Immutable.is(toast(Map(), closeToast()), Map({open: false})));
  }
);
