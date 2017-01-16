import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import {Map} from 'immutable';
import sinon from 'sinon';
import {hello, clearHello} from '../action';
import {setToast} from '../../../common/action/toast';
import {Home} from '../HomePage';

const dispatch = sinon.spy();

const props = {
  home: Map({content: 'Hello World'}),
  dispatch
};

const wrapper = shallow(
  <Home {...props} />
);

test('simulates click events', t => {
  wrapper.find('button').at(0).simulate('click', {stopPropagation: () => {}});
  t.truthy(dispatch.calledOnce);
  t.truthy(dispatch.calledWith(hello('开启 React Router Redux Immutable 之旅吧！')));
});

test('calling helloHandle dispatches hello', t => {
  wrapper.instance().helloHandle()({stopPropagation: () => {}});
  t.truthy(dispatch.calledTwice);
  t.truthy(dispatch.calledWith(hello('开启 React Router Redux Immutable 之旅吧！')));
});

test('calling helloHandle dispatches to clear hello', t => {
  wrapper.find('button').at(1).simulate('click', {stopPropagation: () => {}});
  t.truthy(dispatch.calledThrice);
  t.truthy(dispatch.calledWith(clearHello()));
});

test('calling toastHandle dispatches setToast', t => {
  const wrapper = shallow(
    <Home {...props} />
  );

  wrapper.instance().toastHandle({stopPropagation: () => {}});
  t.truthy(dispatch.callCount === 4);
  t.truthy(dispatch.calledWith(setToast({
    content: '你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！'
  })));
});