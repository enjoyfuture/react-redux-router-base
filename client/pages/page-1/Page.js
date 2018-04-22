import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';

const Page = () => {

  return (
    <div className="container m-t-1">
      <nav className="tab-bar tab-bar-primary">
        <NavLink className="tab" activeClassName="active" to="/module1">Module1</NavLink>
        <NavLink className="tab" activeClassName="active" to="/module2">Module2</NavLink>
        <NavLink className="tab" activeClassName="active" to="/file-download-upload">File Download Upload</NavLink>
        <NavLink className="tab" activeClassName="active" to="/iconfont">Icon Font</NavLink>
      </nav>

      <Route path="/module1" component={Loadable({
        loader: () => import('./module-1/components/com-1'),
        loading: LoadingComponent,
      })}/>
      <Route path="/module2" component={Loadable({
        loader: () => import('./module-2/components/com-1'),
        loading: LoadingComponent,
      })}/>
      <Route path="/file-download-upload" component={Loadable({
        loader: () => import('./file-download-upload/components/FileUpload'),
        loading: LoadingComponent,
      })}/>
      <Route path="/iconfont" component={Loadable({
        loader: () => import('./iconfont/IconFont'),
        loading: LoadingComponent,
      })}/>
    </div>
  );
};

export default Page;
