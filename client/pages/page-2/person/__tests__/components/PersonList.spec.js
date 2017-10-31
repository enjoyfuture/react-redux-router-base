import React from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import {Map} from 'immutable';
import PersonList from '../../components/PersonList';

configure({adapter: new Adapter()});
const props = {
  person: Map()
};

const dispatch = sinon.spy(); // mock方法

function componentWrapper() {
  return shallow(
    <PersonList {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: PropTypes.func,
      },
    });
}

test('render children', t => {
  const wrapper = componentWrapper();
  t.is(wrapper.find('.page-loading').length, 1);
});

test('calls componentDidMount', t => {
  sinon.spy(PersonList.prototype, 'componentDidMount');
  mount(<PersonList {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: PropTypes.func,
      },
    });

  t.truthy(PersonList.prototype.componentDidMount.calledOnce);
  PersonList.prototype.componentDidMount.restore();
});
