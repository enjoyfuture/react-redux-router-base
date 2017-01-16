import React, {PropTypes} from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import PersonForm from '../../components/PersonForm';
import {addPerson} from '../../action';

const dispatch = sinon.spy(); // mock方法

//mock router，这里为了展示，多写了一些方法，实际该测试中只用到了 goBack
const router = {
  isActive: sinon.stub().returns(true),
  push: sinon.stub(),
  replace: sinon.stub(),
  go: sinon.stub(),
  goBack: sinon.stub(),
  goForward: sinon.stub(),
  setRouteLeaveHook: sinon.stub(),
  createHref: sinon.stub(),
};

test('render children', t => {
  const wrapper = shallow(
    <PersonForm />,
    {
      context: {
        router,
        dispatch
      },
      childContextTypes: {
        router: React.PropTypes.object,
        dispatch: React.PropTypes.func,
      },
    }
  );
  t.is(wrapper.find('input').length, 2);
});

test('test addPerson', t => {
  const wrapper = shallow(
    <PersonForm />,
    {
      context: {
        router,
        dispatch
      },
      childContextTypes: {
        router: React.PropTypes.object,
        dispatch: React.PropTypes.func,
      },
    });
  wrapper.find('input').at(0).simulate('change', {target: {value: 'li'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'si'}});
  t.is(wrapper.state('firstName'), 'li');
  t.is(wrapper.state('lastName'), 'si');

  // save
  const instance = wrapper.instance();
  instance.savePerson().then(() => {
    t.truthy(addPerson.calledOnce);
  });
});