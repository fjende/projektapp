import React, { Component } from 'react';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default App;
