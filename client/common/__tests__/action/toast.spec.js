import test from 'ava';
import {setToast, clearToast} from '../../action/toast';

test('should return the correct type for setToast',
  t => {
    t.deepEqual(setToast({content: 'Toast Content', effect: 'enter', time: 2000}), {
      type: 'set_toast',
      content: 'Toast Content',
      effect: 'enter',
      time: 2000
    });
  }
);

test('should return the correct type for setToast, return the default value',
  t => {
    t.deepEqual(setToast({}), {
      type: 'set_toast',
      content: '',
      effect: 'enter',
      time: 3000
    });
  }
);

test('should return the correct type for clearToast',
  t => {
    t.deepEqual(clearToast('leave'), {type: 'clear_toast', effect: 'leave'});
  }
);
