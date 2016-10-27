/**
 * Root Reducer
 */
import {combineReducers} from 'redux-immutable';
import routing from '../../util/routing';
import toast from '../../modules/app/reducer';

export default combineReducers({
  routing,
  toast
});

