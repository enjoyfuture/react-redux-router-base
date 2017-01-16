import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import About from '../AboutPage';

//单元测试，测试渲染的属性是否正确
test('About renders properly', t => {
  const wrapper = shallow(<About />);

  t.is(wrapper.find('.about').length, 1);
  t.is(wrapper.find('.about-img > img').length, 4);
  t.true(wrapper.find('> h2').text() === 'React, Redux, Router, Webpack etc.');
});

