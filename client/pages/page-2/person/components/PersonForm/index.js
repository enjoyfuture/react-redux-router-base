import React, {Component, PropTypes} from 'react';
import {fromJS} from 'immutable';
import callApi from '../../../../../utils/fetch';
import {addPerson} from '../../action';

class PersonForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static propTypes = {
    personAction: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  savePerson = () => {
    const {firstName, lastName} = this.state;
    const url = 'person';
    const {dispatch, router} = this.context;
    //这里没有走 action, 直接发送 fetch 请求,对于不需要维护状态的请求,我们也可以直接调用 fetch
    return callApi({
      url,
      body: {
        firstName,
        lastName
      },
      method: 'post'
    }).then(
      (json) => {
        dispatch(addPerson(fromJS(json.data)));
        router.goBack();
      },
      (error) => {

      }
    );
  };

  handleChange = (field) => {
    return (event) => {
      const val = event.target.value;
      this.setState({
        [field]: val
      });
    };
  };

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form>
        <div className="form-group row">
          <label className="col-2 form-control-label">First Name</label>
          <div className="col-4">
            <input type="text" className="form-control" placeholder="First Name"
                   value={firstName} onChange={this.handleChange('firstName')}/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 form-control-label">Last Name</label>
          <div className="col-4">
            <input type="text" className="form-control" placeholder="Last Name"
                   value={lastName} onChange={this.handleChange('lastName')}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-offset-2 col-4">
            <button type="button" className="btn btn-primary"
                    onClick={this.savePerson}>Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default PersonForm;
