import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import callApi from '../../../util/fetch';
import bootstrap from '../../../util/bootstrapCss';

class PersonForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
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

  addPerson = () => {
    const {firstName, lastName} = this.state;
    const url = 'person';

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
        this.props.personAction.addPerson(Immutable.fromJS(json.data));
        this.context.router.goBack();
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
        <div className={bootstrap('form-group', 'row')}>
          <label className={bootstrap('col-sm-2', 'form-control-label')}>First Name</label>
          <div className={bootstrap('col-sm-4')}>
            <input type="text" className={bootstrap('form-control')} placeholder="First Name"
                   value={firstName} onChange={this.handleChange('firstName')}/>
          </div>
        </div>

        <div className={bootstrap('form-group', 'row')}>
          <label className={bootstrap('col-sm-2', 'form-control-label')}>Last Name</label>
          <div className={bootstrap('col-sm-4')}>
            <input type="text" className={bootstrap('form-control')} placeholder="Last Name"
                   value={lastName} onChange={this.handleChange('lastName')}/>
          </div>
        </div>
        <div className={bootstrap('form-group', 'row')}>
          <div className={bootstrap('col-sm-offset-2', 'col-sm-4')}>
            <button type="button" className={bootstrap('btn', 'btn-primary')}
                    onClick={this.addPerson}>Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default PersonForm;
