import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route} from 'react-router-dom';

import Root from '../../Root';
import toast from '../../common/reducers/toast';
import App from '../../common/App';
import AboutPage from './AboutPage';
import {urlContext} from '../../utils/config';

const routes = () => {
  return (
    <App>
      <Route path="/" component={AboutPage}/>
    </App>
  );
};

const reducers = combineReducers({
  toast,
});

render(
  <Root routes={routes} reducers={reducers} basename={`${urlContext}/about`}/>,
  document.getElementById('layout'),
);
