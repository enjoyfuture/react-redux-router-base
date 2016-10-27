import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Person from './components/Person';
import * as personAction from './action';

function mapStateToProps(state, ownProps) {
  const person = state.get('person');
  return {
    person
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personAction: bindActionCreators(personAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);


