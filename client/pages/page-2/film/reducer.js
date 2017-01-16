import {combineReducers} from 'redux-immutable';
import {Map, fromJS} from 'immutable';

const film = combineReducers({
  allFilmList: (state = Map(), action) => {
    const {type, data} = action;
    if (type === 'film-all-success') {
      return state.set('items', fromJS(data));
    }
    return state;
  },
  popularityFilmList: (state = Map(), action) => {
    const {type, data} = action;
    if (type === 'film-popularity-success') {
      return state.set('items', fromJS(data));
    }
    return state;
  }
});

export default film;
