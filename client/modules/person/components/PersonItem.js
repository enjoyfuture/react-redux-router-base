import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import callApi from '../../../util/fetch';
import styles from '../person.less'
const cx = classNames.bind(styles);

class PersonItem extends Component {
  static propTypes = {
    personAction: PropTypes.object,
    person: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      person: this.props.person
    };

    this.personDefault = this.props.person;
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      editing: false,
      person: this.personDefault
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const {personAction} = this.props;
    const url = 'person';
    const body = this.state.person.toJSON();

    return callApi({
      url, body, method: 'post'
    }).then(
      (json) => {
        personAction.updatePerson(this.state.person);
        this.setState({
          editing: false
        }, () => {
          this.personDefault = this.state.person;
        });
      },
      (error) => {
      }
    );
  };

  handleDelete = (id) => {
    return (e) => {
      e.preventDefault();
      const {personAction} = this.props;
      const url = 'person';
      return callApi({
        url, body: {
          id
        }, method: 'delete'
      }).then(
        (json) => {
          personAction.deletePerson(id);
        },
        (error) => {

        }
      );
    }
  };

  textOrInput(field, val) {
    const editing = this.state.editing;
    if (editing) {
      // 这里使用可控输入框组件
      return (
        <input type="text" value={val} onChange={this.handleChange(field)}/>
      );
    }
    return (
      <span>{val}</span>
    );
  }

  handleChange = (field) => {
    return (event) => {
      const person = this.state.person;
      const val = event.target.value;
      this.setState({
        person: person.set(field, val)
      });
    }
  };

  render() {
    const {editing, person} = this.state;
    const id = person.get('id');
    const firstName = person.get('firstName');
    const lastName = person.get('lastName');

    return (
      <tr>
        <th>{id}</th>
        <td>{this.textOrInput('firstName', firstName)}</td>
        <td>{this.textOrInput('lastName', lastName)}</td>
        <td>{firstName + lastName}</td>
        <td className={cx('link-group')}>
          <a href="" style={{display: !editing ? 'inline' : 'none'}}
             onClick={this.handleEdit}>编辑</a>
          <a href="" style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleCancel}>取消</a>
          <a href="" style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleSave}>保存</a>
          <a href="" onClick={this.handleDelete(id)}>删除</a>
        </td>
      </tr>
    );
  }
}


export default PersonItem;
