import test from 'ava';
import {setCache, removeCache, clearCache} from '../../action/caches';

test('should return the correct type for setCache',
  t => {
    t.deepEqual(setCache('loaded-person', {success: true}), {
      type: 'set_cache',
      key: 'loaded-person',
      value: {success: true}
    });
  }
);

test('should return the correct type for setCache, return the default value',
  t => {
    t.deepEqual(setCache('loaded-person'), {
      type: 'set_cache',
      key: 'loaded-person',
      value: true
    });
  }
);

test('should return the correct type for removeCache',
  t => {
    t.deepEqual(removeCache(['id1', 'id2']), {type: 'remove_cache', keys: ['id1', 'id2']});
  }
);

test('should return the correct type for clearCache',
  t => {
    t.deepEqual(clearCache(['id1', 'id2']), {type: 'clear_cache'});
  }
);