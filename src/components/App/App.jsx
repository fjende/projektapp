import React, { Component } from 'react';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import Tasks from '../Pages/Tasks/Tasks';
import Categories from '../Pages/Categories/Categories';
import Statistics from '../Pages/Statistics/Statistics';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CreateTask from '../Pages/Tasks/CreateTask';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00b0ff',
      contrastText: '#FFF',
      alternateTextColor: '#000'
    },
    secondary: {
      main: '#FFF',
      contrastText: '#00b0ff'
    },
    textPrimary: {
      main: '#00b0ff'
    }
  },
  shadows: ['none']
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
            <Route path="/tasks" exact component={Tasks} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/statistics" exact component={Statistics} />
            <Route path="/tasks/new" component={CreateTask} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
