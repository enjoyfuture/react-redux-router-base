import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import Loadable from 'react-loadable';

const Page = () => {
  return (
    <div className="container m-t-3">
      <nav className="tab-bar tab-bar-primary">
        <NavLink className="tab" activeClassName="active" to="/person">Person</NavLink>
        <NavLink className="tab" activeClassName="active" to="/film">Film</NavLink>
      </nav>
      <div className="m-t-2">
        <Route path="/person" component={Loadable({
          loader: () => import('./person/components/Person'),
          loading: LoadingComponent,
        })}/>
        <Route path="/film" component={Loadable({
          loader: () => import('./film/components/Film'),
          loading: LoadingComponent,
        })}/>
      </div>
    </div>
  );
};

export default Page;


