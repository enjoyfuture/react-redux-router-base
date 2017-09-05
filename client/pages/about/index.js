import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route, IndexRoute} from 'react-router';

import Root from '../../Root';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import App from '../../common/App';
import AboutPage from './AboutPage';
import {context} from '../../utils/config';
import '../../common/scss/main.scss';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={AboutPage}/>
  </Route>
);

const reducers = combineReducers({
  routing,
  toast
});

render(
  <Root routes={routes} reducers={reducers} basename={`${context}/about`}/>,
  document.getElementById('layout')
);
