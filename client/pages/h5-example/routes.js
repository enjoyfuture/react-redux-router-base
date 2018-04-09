import React from 'react';
import {Route, IndexRoute} from 'react-router-dom';
import H5ExamplePage from './H5ExamplePage';
import Detail from './detail/components/Detail';

// 把 store 传入路由中，这样不同的路由可以根据 store 值来处理业务逻辑
const routes = (store) => {
  return (
    <H5ExamplePage>
      <Route path="/detail" component={Detail}/>
    </H5ExamplePage>
  );
};

export default routes;
