import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { loginValidationSchema } from './validation';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  const classes = useStyles();

  useEffect(() => {
    if (sessionStorage.getItem('loggedIn')) {
      props.history.push('/home');
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .post(`${API_ENDPOINT}/auth`, {
                email: values.email,
                password: values.password
              })
              .then(response => {
                sessionStorage.setItem('loggedIn', true);
                sessionStorage.setItem('userId', response.data.id);
                props.history.push('/home');
              })
              .catch(() => alert('Wrong credentials!'))
              .finally(() => formikBag.resetForm());
          }}
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          render={formikProps => {
            return (
              <Form className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        ></Formik>
      </div>
    </Container>
  );
}
