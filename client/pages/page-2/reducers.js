import {combineReducers} from 'redux-immutable';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import loading from '../../common/reducers/loading';
import person from './person/reducer';
import film from './film/reducer';

export default combineReducers({
  toast,
  caches,
  loading,
  person,
  film
});

