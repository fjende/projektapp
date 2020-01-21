import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import { registerValidationSchema } from './validation';

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Register(props) {
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
              .post(`${API_ENDPOINT}/register`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
              })
              .then(() => {
                alert('Successfully registered!');
                props.history.push('/');
              })
              .catch(() => alert('Email already exists!'))
              .finally(() => formikBag.resetForm());
          }}
          validationSchema={registerValidationSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }}
          render={formikProps => {
            console.log(formikProps.values);
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
                  Sign Up
                </Button>
              </Form>
            );
          }}
        ></Formik>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
