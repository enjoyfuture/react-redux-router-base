import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import Footer from '../../components/Footer';

test('renders the footer properly', t => {
  const wrapper = shallow(
    <Footer />
  );

  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('p').first().text(), 'Copyright © 2016-2017 京东金融科技业务部前端');
});
