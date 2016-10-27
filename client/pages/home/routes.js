import {Route, IndexRoute} from 'react-router';
import App from '../../modules/app/AppPage';
import HomePage from '../../modules/home/HomePage';

/*eslint-disable react/react-in-jsx-scope*/
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);

export default routes;