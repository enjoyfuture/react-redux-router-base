/**
 * Root Reducer
 */
import {combineReducers} from 'redux-immutable';
import routing from '../../util/routing';
import toast from '../../modules/app/reducer';
import home from '../../modules/home/reducer';

export default combineReducers({
  routing,
  toast,
  home
});

