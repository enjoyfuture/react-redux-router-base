import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router-dom';
import Root from '../../Root';
import reducers from './reducers';
import {urlContext} from '../../utils/config';
import App from '../../common/App';
import Page from './Page';

const routes = () => {
  return (
    <App>
      <Route path="/" component={Page}/>
    </App>
  );
};

render(
  <Root routes={routes} reducers={reducers} basename={`${urlContext}/page2`}/>,
  document.getElementById('layout')
);
