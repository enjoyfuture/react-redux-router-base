import test from 'ava';
import Immutable, {Map} from 'immutable';
import {setCache, removeCache, clearCache} from '../../action/caches';
import caches from '../../reducers/caches';

test('action for setCache is working',
  t => {
    const action = setCache('loaded-person', 'loaded');
    const stateAfter = Map({'loaded-person': 'loaded'});
    t.true(Immutable.is(caches(undefined, action), stateAfter))
  }
);

test('action for setCache is working, the case: the default value', t => {
  const action = setCache('loaded-person');
  const stateAfter = Map({'loaded-person': true});
  t.true(Immutable.is(caches(undefined, action), stateAfter))
});

test('action for removeCache is working', t => {
  const action = removeCache(['loaded-person']);
  const stateAfter = Map();
  t.true(Immutable.is(caches(Map({'loaded-person': true}), action), stateAfter));
});

test('action for clearCache is working', t => {
  const action = clearCache();
  const stateAfter = Map();
  t.true(Immutable.is(caches(Map({a: true, b: true, c: 'true'}), action), stateAfter));
});

