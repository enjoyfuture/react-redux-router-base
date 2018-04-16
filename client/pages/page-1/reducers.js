import {combineReducers} from 'redux-immutable';
import toast from '../../common/reducers/toast';
import loading from '../../common/reducers/loading';
import caches from '../../common/reducers/caches';
import module1 from './module-1/reducer';
import module2 from './module-2/reducer';

export default combineReducers({
  toast,
  caches,
  loading,
  module1,
  module2
});

