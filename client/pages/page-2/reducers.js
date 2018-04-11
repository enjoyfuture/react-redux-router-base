import {combineReducers} from 'redux-immutable';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import person from './person/reducer';
import film from './film/reducer';

export default combineReducers({
  toast,
  caches,
  person,
  film
});

