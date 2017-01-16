import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import Header from '../../components/Header';

test('renders the header properly', t => {
  const wrapper = shallow(
    <Header/>
  );

  t.truthy(wrapper.find('.header-nav-item').first().containsMatchingElement('Home'));

  t.is(wrapper.find('.header-nav-item').length, 4);
});
