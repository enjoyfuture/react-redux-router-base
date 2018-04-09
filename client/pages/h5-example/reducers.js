import {combineReducers} from 'redux-immutable';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import detail from './detail/reducer';

export default combineReducers({
  toast,
  caches,
  detail,
});

