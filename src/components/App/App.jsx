import React, { Component } from 'react';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import Home from '../Pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#82ccdd',
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: '#323133',
      contrastText: "#FFFFFF",
    }
  },
  shadows: ["none"],
});

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
