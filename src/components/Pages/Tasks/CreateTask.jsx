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

export default function CreateTask(props) {
  const classes = useStyles();

  const USER_ID = sessionStorage.getItem('userId');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .post(`${API_ENDPOINT}/activity`, {
                name: values.name,
                dueDate: values.dueDate,
                userId: USER_ID,
                typeId: values.typeId,
                colorId: values.colorId
              })
              .then(() => {
                alert('Successfully added new task!');
                props.history.push('/tasks');
              })
              .catch(() => alert('Invalid Data!'))
              .finally(() => formikBag.resetForm());
          }}
          validationSchema={registerValidationSchema}
          initialValues={{
            name: '',
            dueDate: '',
            typeId: '',
            colorId: '',
            statusId: 1
          }}
          render={formikProps => {
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      label="Task Title"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Due Date"
                      name="dueDate"
                      autoComplete="dDate"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="typeId"
                      label="Type"
                      name="typeId"
                      autoComplete="type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="colorId"
                      label="Color"
                      autoComplete="color"
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
                  Add
                </Button>
              </Form>
            );
          }}
        ></Formik>
      </div>
    </Container>
  );
}
