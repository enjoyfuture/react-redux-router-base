import React from 'react';
import test from 'ava';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import About from '../Container';
import style from '../about.module.scss';

configure({ adapter: new Adapter() });

// 单元测试，测试渲染的属性是否正确
test('About renders properly', t => {
  const wrapper = shallow(<About />);

  t.is(wrapper.find(`.${style.about}`).length, 1);
  t.is(wrapper.find(`.${style['about-img']} > img`).length, 4);
  t.true(wrapper.find('h2').text() === 'React, Redux, Router, Webpack etc.');
});
