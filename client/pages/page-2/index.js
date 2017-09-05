import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';

import Root from '../../Root';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import person from './person/reducer';
import film from './film/reducer';

import routes from './routes';
import {context} from '../../utils/config';

const reducers = combineReducers({
  routing,
  toast,
  caches,
  person,
  film
});

render(
  <Root routes={routes} reducers={reducers} basename={`${context}/page2`}/>,
  document.getElementById('layout')
);
