import React from 'react';
//测试框架，类似于 mocha jest jasmine 等
import test from 'ava';
//React测试工具，依赖 react-addons-test-utils 类似 jquery 风格的 api 操作react 节点
import {shallow, mount} from 'enzyme';
//提供 fake 数据，替换函数调用等功能
import sinon from 'sinon';
import {Map} from 'immutable';
import {App} from '../App';

const children = <h1>Test</h1>;
const toast = Map();
const dispatch = sinon.spy();
const props = {
  children,
  toast,
  dispatch
};

//单元测试，测试渲染的属性是否正确
test('renders properly', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  t.is(wrapper.find('Header').length, 1);
  t.is(wrapper.find('Footer').length, 1);
});

test('when the component is initialized, it will not call componentDidMount', t => {
  const spy = sinon.spy(App.prototype, 'componentDidUpdate');
  mount(<App {...props} />);
  t.falsy(spy.called);
});

test('allows us to set props: toast', t => {
  const wrapper = mount(<App {...props} />);
  t.is(wrapper.props().toast.get('content'), undefined);
  wrapper.setProps({ toast: new Map({content: 'Toast Test'}) });
  t.is(wrapper.props().toast.get('content'), 'Toast Test');
});
