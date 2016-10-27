/**
 * Root Reducer
 */
import {combineReducers} from 'redux-immutable';
import routing from '../../util/routing';
import toast from '../../modules/app/reducer';
import person from '../../modules/person/reducer';

export default combineReducers({
  routing,
  toast,
  person
});

