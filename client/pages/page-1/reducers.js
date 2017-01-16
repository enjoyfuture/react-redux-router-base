import {combineReducers} from 'redux-immutable';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import module1 from './module-1/reducer';
import module2 from './module-2/reducer';

export default combineReducers({
  routing,
  toast,
  caches,
  module1,
  module2
});

