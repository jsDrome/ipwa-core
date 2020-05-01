import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import get from 'lodash/get';

import Home from './Home/Home';
import Auth from './Auth/Auth';

const Component = get(window._ipwa, 'isUserLoggedIn') ? Auth : Home;

const Routes = () => <Router>
  <Switch>
    <Route path="/" component={Component} />
  </Switch>
</Router>

export default Routes;
