import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Immutable, {Map} from 'immutable';
import PersonItem from '../../components/PersonItem';
import {updatePerson, deletePerson} from '../../action';

const props = {
  person: Map({id: 1, firstName: 'zhang', lastName: 'san'})
};

const dispatch = sinon.spy(); // mock方法

const eventObject = {
  preventDefault: () => {
  }
};

test('render children', t => {
  const wrapper = shallow(<PersonItem {...props} />);
  t.is(wrapper.children().length, 5);
});

test('test edit and the method handleEdit', t => {
  const wrapper = shallow(
    <PersonItem {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: React.PropTypes.func,
      },
    });
  wrapper.find('td a').at(0).simulate('click', eventObject);
  t.is(wrapper.state('editing'), true);
  t.is(wrapper.find('td').at(0).find('input').length, 1);
});

test('test cancel and the method handleCancel', t => {
  const wrapper = shallow(
    <PersonItem {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: React.PropTypes.func,
      },
    });

  wrapper.find('td a').at(0).simulate('click', eventObject);
  wrapper.find('td').at(0).find('input').simulate('change', {target: {value: 'wang'}});
  t.true(Immutable.is(wrapper.state('person'), Map({id: 1, firstName: 'wang', lastName: 'san'})));

  //call handleCancel to cancel edit
  wrapper.find('td a').at(1).simulate('click', {
    preventDefault: () => {
    }
  });
  t.false(wrapper.state('editing'));
  t.true(Immutable.is(wrapper.state('person'), Map({id: 1, firstName: 'zhang', lastName: 'san'})));
});

test('test save and the method handleSave', t => {
  const wrapper = shallow(
    <PersonItem {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: React.PropTypes.func,
      },
    });
  wrapper.find('td a').at(0).simulate('click', eventObject);
  wrapper.find('td').at(0).find('input').simulate('change', {target: {value: 'zhao'}});

  //call handleSave to save
  const instance = wrapper.instance();
  instance.handleSave(eventObject).then(() => {
    t.false(wrapper.state('editing'));
    t.true(Immutable.is(instance.personDefault, Map({id: 1, firstName: 'zhao', lastName: 'san'})));
  });
});

test('test delete and the method handleDelete', t => {
  const wrapper = shallow(
    <PersonItem {...props} />,
    {
      context: {
        dispatch
      },
      childContextTypes: {
        dispatch: React.PropTypes.func,
      },
    });

  const instance = wrapper.instance();
  instance.handleDelete(1)(eventObject).then(() => {
    t.truthy(deletePerson.calledOnce);
  });
});