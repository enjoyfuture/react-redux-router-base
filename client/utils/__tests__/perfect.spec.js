import test from 'ava';
import perfect from '../perfect';

test('Test method parseJSON', t => {
  const json = perfect.parseJSON('{"a":1,"b":2,"c":3}');
  t.deepEqual(json, {
    a: 1,
    b: 2,
    c: 3
  });
});

test('Test method stringifyJSON', t => {
  const str = perfect.stringifyJSON({
    a: 1,
    b: 2,
    c: 3
  });
  t.is(str, '{"a":1,"b":2,"c":3}');
});

test('Test method formatDate, showMs and showYear', t => {
  const time = perfect.formatDate({time: 1476784801248, showMs: true, showYear: true});
  t.is(time, '2016-10-18 18:00:01.248');
});

test('Test method formatDate, not showMs and showYear', t => {
  const time = perfect.formatDate({time: 1476784801248});
  t.is(time, '10-18 18:00:01');
});

test('Test method createDate', t => {
  const date = perfect.createDate('2016-06-02 13:01:50.333');
  t.is(date.getTime(), new Date('2016-06-02T05:01:50.333Z').getTime());
});

