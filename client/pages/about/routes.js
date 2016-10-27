import {Route, IndexRoute} from 'react-router';
import App from '../../modules/app/AppPage';
import AboutPage from '../../modules/about/AboutPage';

/*eslint-disable react/react-in-jsx-scope*/
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={AboutPage}/>
  </Route>
);

export default routes;