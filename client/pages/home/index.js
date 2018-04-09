import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route} from 'react-router-dom';

import Root from '../../Root';
import toast from '../../common/reducers/toast';
import home from './reducer';
import App from '../../common/App';
import HomePage from './HomePage';
import {urlContext} from '../../utils/config';

const routes = (store) => {
  return (
    <App>
      <Route path="/" component={HomePage}/>
    </App>
  );
};


const reducers = combineReducers({
  toast,
  home,
});

render(
  <Root routes={routes} reducers={reducers} basename={`${urlContext}/home`}/>,
  document.getElementById('layout'),
);
