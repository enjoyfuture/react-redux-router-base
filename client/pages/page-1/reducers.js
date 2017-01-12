import {combineReducers} from 'redux-immutable';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';

export default combineReducers({
  routing,
  toast,
  caches
});

