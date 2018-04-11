import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router-dom';
import Root from '../../Root';
import reducers from './reducers';
import {urlContext} from '../../utils/config';
import H5ExamplePage from './H5ExamplePage';
import Detail from './detail/components/Detail';

const routes = () => {
  return (
    <H5ExamplePage>
      <Route path="/detail/:projectId" component={Detail}/>
    </H5ExamplePage>
  );
};

render(
  <Root routes={routes} reducers={reducers} basename={`${urlContext}/h5-example`}/>,
  document.getElementById('layout')
);
