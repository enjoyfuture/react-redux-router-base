import React from 'react';
import test from 'ava';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/Footer';

configure({ adapter: new Adapter() });

test('renders the footer properly', t => {
  const wrapper = shallow(<Footer />);

  t.is(wrapper.find('p').length, 1);
  t.is(
    wrapper
      .find('p')
      .first()
      .text(),
    'Copyright © 2016-2017 joy-web'
  );
});
