import React, { Component } from 'react';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00b0ff',
      contrastText: "#FFF",
      alternateTextColor: '#000'
    },
    secondary: {
      main: '#FFF',
      contrastText: "#00b0ff",
    },
    textPrimary: {
      main: '#00b0ff'
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
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
