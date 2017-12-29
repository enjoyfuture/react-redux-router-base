import test from 'ava';
import {openToast, closeToast} from '../../action/toast';

test('should return the correct type for setToast',
  t => {
    t.deepEqual(openToast('Toast Content', 2000), {
      type: 'open-toast',
      content: 'Toast Content',
      time: 2000
    });
  }
);

test('should return the correct type for setToast, return the default value',
  t => {
    t.deepEqual(openToast(), {
      type: 'open-toast',
      content: '',
      time: 0
    });
  }
);

test('should return the correct type for clearToast',
  t => {
    t.deepEqual(closeToast('离开了'), {type: 'close-toast', content: '离开了'});
  }
);
