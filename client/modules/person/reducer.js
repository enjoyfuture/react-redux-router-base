import process from '../../util/processReducer';
import * as PersonActionTypes from './constant';

const {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE,
  PERSON_CLEAN, PERSON_UPDATE, PERSON_DELETE, PERSON_ADD
} = PersonActionTypes;

/**
 * customTypes 根据实际业务需求自定义 reducer
 */
const person = process({
  types: {
    request: PERSON_REQUEST,
    success: PERSON_SUCCESS,
    failure: PERSON_FAILURE,
    clean: PERSON_CLEAN
  },
  customTypes: {
    [PERSON_UPDATE]: (state, action) => {
      const {person} = action;
      return state.updateIn(['entities', 'items'], (items) => {
        return items.map((item) => {
          if (item.get('id') === person.get('id')) {
            return person;
          } else {
            return item;
          }
        })
      });
    },
    [PERSON_DELETE]: (state, action) => {
      const {id} = action;
      return state.updateIn(['entities', 'items'], (items) => {
        return items.filter(item => item.get('id') !== id);
      });
    },
    [PERSON_ADD]: (state, action) => {
      const {person} = action;
      return state.updateIn(['entities', 'items'], (items) => {
        return items.unshift(person);
      });
    },
  }
});

export default person;
