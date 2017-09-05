import React from 'react';
import {render} from 'react-dom';
import Root from '../../Root';
import routes from './routes';
import reducers from './reducers';
import {context} from '../../utils/config';
import '../../common/scss/main.scss';


render(
  <Root routes={routes} reducers={reducers} basename={`${context}/page1`}/>,
  document.getElementById('layout')
);
