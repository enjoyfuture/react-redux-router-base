import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../../common/App';
import Page from './Page';
import {enterHandler, leaveHandler} from './route-setting';
import Person from './person/components/Person';
import PersonList from './person/components/PersonList';
import PersonForm from './person/components/PersonForm';
import Film from './film/components/Film';

// 把 store 传入路由中，这样不同的路由可以根据 store 值来处理业务逻辑
/*eslint-disable react/jsx-no-bind,react/react-in-jsx-scope,react/no-children-prop*/
const routes = (store) => {
  return (
    <App>
      <Page>
        <Route path="/" children={(props) => {
          console.info(props);
          return (
            <li>
              ddd
            </li>
          );
        }}>
        </Route>
      </Page>
    </App>
  );
};
export default routes;
