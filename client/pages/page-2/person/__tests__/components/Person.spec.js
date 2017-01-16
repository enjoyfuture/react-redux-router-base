import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import Person from '../../components/Person';

const children = <h1>Person Test</h1>;
const props = {
  children,
  person: Map()
};

test('render children', t => {
  const wrapper = shallow(<Person {...props} />);
  t.truthy(wrapper.hasClass('person'));
  t.truthy(wrapper.children(), children);
});