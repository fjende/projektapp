import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export class AddTaskModal extends Component {
  render() {
    const { classes, currentActivity, currentTask, hideModal } = this.props;

    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .post(`${API_ENDPOINT}/task`, {
                name: values.name,
                durationHours: values.duration,
                activityId: currentActivity.id,
                superTaskId: currentTask && currentTask.id
              })
              .then(() => hideModal())
              .catch(error => alert('Task name already exists!'));
          }}
          initialValues={{ name: '', duration: '' }}
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
                    Create
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

export default injectSheet(styles)(AddTaskModal);
