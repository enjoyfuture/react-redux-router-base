import {combineReducers} from 'redux-immutable';
import toast from '../../common/reducers/toast';
import loading from '../../common/reducers/loading';
import caches from '../../common/reducers/caches';
import detail from './detail/reducer';

export default combineReducers({
  toast,
  loading,
  caches,
  detail,
});

