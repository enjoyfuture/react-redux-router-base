import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {Map} from 'immutable';
import PersonList from '../../components/PersonList';

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
        dispatch: React.PropTypes.func,
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
        dispatch: React.PropTypes.func,
      },
    });

  t.truthy(PersonList.prototype.componentDidMount.calledOnce);
  PersonList.prototype.componentDidMount.restore();
});
