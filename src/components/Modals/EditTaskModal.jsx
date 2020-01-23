import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { API_ENDPOINT } from '../../api';

const styles = {
  inputs: {
    marginBottom: '20px',
    '& > div': {
      marginBottom: '20px'
    }
  }
};

export class EditTaskModal extends Component {
  render() {
    const { classes, currentTask, hideModal } = this.props;

    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .put(`${API_ENDPOINT}/task/${currentTask.id}`, {
                name: values.name,
                durationHours: values.duration
              })
              .then(() => hideModal())
              .catch(error => alert('Could not update task!'));
          }}
          initialValues={{ name: currentTask.name, duration: currentTask.durationHours }}
          render={formikProps => {
            return (
              <Form className={classes.form}>
                <div className={classes.inputs}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    id="duration"
                    label="Duration (hours)"
                    name="duration"
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Edit
                  </Button>
                </div>
              </Form>
            );
          }}
        ></Formik>
      </div>
    );
  }
}

export default injectSheet(styles)(EditTaskModal);
