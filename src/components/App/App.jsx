import React, { Component } from 'react';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#55E6C1',
      contrastText: "#FFFFFF",
    },
  },
});

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
