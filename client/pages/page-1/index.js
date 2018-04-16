import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router-dom';
import Root from '../../Root';
import App from '../../common/App';
import Page from './Page';
import reducers from './reducers';
import {urlContext} from '../../utils/config';

const container = () => {
  return (
    <App>
      <Route path="/" component={Page}/>
    </App>
  );
};

render(
  <Root container={container} reducers={reducers} basename={`${urlContext}/page1`}/>,
  document.getElementById('layout')
);
