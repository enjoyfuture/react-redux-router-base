import React from 'react';
// import {render} from 'react-dom';
// import {Route} from 'react-router-dom';
// import { Route } from 'dva/router';
// import models from './models';
import Root from '../../Root';
// import reducers from './reducers';
import {urlContext} from '../../utils/config';
import App from '../../common/App';
// import Page from './Page';

const basename = `${urlContext}/`;

const container = () => {
  return (
    <App>
      ss
    </App>
  );
};

// render(
//   <Root container={container} reducers={reducers} basename={`${urlContext}/page2`}/>,
//   document.getElementById('layout')
// );

Root({ container });
