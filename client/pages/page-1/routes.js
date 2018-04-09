import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../../common/App';
import Page from './Page';
import Module1Com1 from './module-1/components/com-1';
import Module1Com2 from './module-1/components/com-2';
import Module2Com1 from './module-2/components/com-1';
import UploadFile from './upload-file/components/UploadFile';

const routes = (store) => {
  return (
    <App>
      <Page>
        <div>
          <Module1Com1>
            <Route path="/module1" component={Module1Com2}/>
          </Module1Com1>
          <Route path="/module2" component={Module2Com1}/>
          <Route path="/upload-file" component={UploadFile}/>
        </div>
      </Page>
    </App>
  );
};

export default routes;
