import React from 'react';
import test from 'ava';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

configure({ adapter: new Adapter() });

test('renders the header properly', t => {
  const wrapper = shallow(<Header />);

  t.truthy(
    wrapper
      .find('.navbar')
      .first()
      .containsMatchingElement('React+Redux+Router')
  );

  t.is(wrapper.find('.nav-link').length, 4);
});
