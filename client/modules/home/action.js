import {HELLO} from './constant';

export function hello(content = '') {
  return {
    type: HELLO,
    content,
  };
}

