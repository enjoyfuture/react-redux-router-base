import React from 'react';
import test from 'ava';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map} from 'immutable';
import Person from '../../components/Person';

configure({adapter: new Adapter()});

const children = <h1>Person Test</h1>;
const props = {
  children,
  person: Map(),
};

test('render children', t => {
  const wrapper = shallow(<Person {...props} />);
  t.truthy(wrapper.children(), children);
});
