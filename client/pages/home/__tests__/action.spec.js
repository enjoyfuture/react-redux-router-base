import test from 'ava';
import {hello, clearHello} from '../action';

test('should return the correct value for hello',
  t => {
    t.deepEqual(hello('Hello, World'), {
      type: 'home-hello',
      content: 'Hello, World',
    });
  }
);

test('should return the correct value for hello, return the default value',
  t => {
    t.deepEqual(hello(), {
      type: 'home-hello',
      content: '',
    });
  }
);

test('should return the correct value for clearHello',
  t => {
    t.deepEqual(clearHello(), {
      type: 'home-clear-hello'
    });
  }
);

