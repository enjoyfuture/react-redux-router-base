import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route} from 'react-router-dom';

import Root from '../../Root';
import toast from '../../common/reducers/toast';
import loading from '../../common/reducers/loading';
import App from '../../common/App';
import AboutPage from './AboutPage';
import {urlContext} from '../../utils/config';

const container = () => {
  return (
    <App>
      <Route path="/" component={AboutPage}/>
    </App>
  );
};

const reducers = combineReducers({
  toast,
  loading,
});

render(
  <Root container={container} reducers={reducers} basename={`${urlContext}/about`}/>,
  document.getElementById('layout'),
);
