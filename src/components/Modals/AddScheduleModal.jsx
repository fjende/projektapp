import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik, Form } from 'formik';
import { Button, Checkbox } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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

export class AddScheduleModal extends Component {
  render() {
    const { classes, currentActivity, currentTask, hideModal } = this.props;
    const currentDate = new Date();
    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .post(`${API_ENDPOINT}/task/${currentTask.id}`, {
                date: values.date,
                timeFrom: values.timeFrom,
                timeTo: values.timeTo,
                isFixed: values.isFixed,
                taskId: currentTask.id
              })
              .then(() => hideModal())
              .catch(error => alert('Activity name already exists!'));
          }}
          initialValues={{ date: currentDate, timeFrom: currentDate, timeTo: currentDate, isFixed: false }}
          render={formikProps => {
            return (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form className={classes.form}>
                  <div className={classes.inputs}>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="yyyy/MM/dd"
                      disablePast
                      maxDate={new Date(currentActivity.dueDate)}
                      maxDateMessage="Due date is before the date you want to add!"
                      value={formikProps.values.date}
                      onChange={date => formikProps.setFieldValue('date', date)}
                    />
                    <KeyboardTimePicker
                      ampm={false}
                      inputVariant="outlined"
                      label="Start time"
                      value={formikProps.values.timeFrom}
                      minutesStep={5}
                      onChange={date => formikProps.setFieldValue('timeFrom', date)}
                    />
                    <KeyboardTimePicker
                      ampm={false}
                      inputVariant="outlined"
                      label="End time"
                      minutesStep={5}
                      value={formikProps.values.timeTo}
                      onChange={date => formikProps.setFieldValue('timeTo', date)}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => formikProps.setFieldValue('isFixed', !formikProps.values.isFixed)}
                          value={formikProps.values.isFixed}
                          color="primary"
                        />
                      }
                      label="Fixed"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Add to schedule
                    </Button>
                  </div>
                </Form>
              </MuiPickersUtilsProvider>
            );
          }}
        ></Formik>
      </div>
    );
  }
}

export default injectSheet(styles)(AddScheduleModal);
