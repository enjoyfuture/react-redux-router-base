import test from 'ava';
import { parseJSON, stringifyJSON, formatDate, createDate } from '../perfect';

test('Test method parseJSON', t => {
  const json = parseJSON('{"a":1,"b":2,"c":3}');
  t.deepEqual(json, {
    a: 1,
    b: 2,
    c: 3,
  });
});

test('Test method stringifyJSON', t => {
  const str = stringifyJSON({
    a: 1,
    b: 2,
    c: 3,
  });
  t.is(str, '{"a":1,"b":2,"c":3}');
});

test('Test method formatDate, showMs and showYear', t => {
  const time = formatDate({ time: 1476784801248, showMs: true });
  t.is(time, '2016-10-18 18:00:01.248');
});

test('Test method formatDate, not showMs and showYear', t => {
  const time = formatDate({ time: 1476784801248, showYear: false });
  t.is(time, '10-18 18:00:01');
});

test('Test method createDate', t => {
  const date = createDate('2016-06-02 13:01:50.333');
  t.is(date.getTime(), new Date('2016-06-02T05:01:50.333Z').getTime());
});
