import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Profile from './component/profile/profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {PrivateRoute} from './component/PrivateRoute';

ReactDOM.render(
    <Router>
      <Switch>
        <PrivateRoute exact path="/user" component={Profile}></PrivateRoute>
        <Route exact path="/" component={App}></Route>
      </Switch>
    </Router>,
  document.getElementById('root')
);

