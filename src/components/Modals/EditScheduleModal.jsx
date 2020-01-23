import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
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

export class EditScheduleModal extends Component {
  render() {
    const { classes, currentSchedule, hideModal } = this.props;

    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .put(`${API_ENDPOINT}/task/schedule/${currentSchedule.id}`, {
                date: values.date,
                timeFrom: values.timeFrom,
                timeTo: values.timeTo,
                isFixed: values.isFixed,
                taskId: currentSchedule.task.id
              })
              .then(() => hideModal())
              .catch(error => alert('Error!'));
          }}
          initialValues={{
            date: currentSchedule.date,
            timeFrom: currentSchedule.timeFrom,
            timeTo: currentSchedule.timeTo,
            isFixed: currentSchedule.isFixed
          }}
          render={formikProps => {
            return (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form className={classes.form}>
                  <div className={classes.inputs}>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="yyyy/MM/dd"
                      disablePast
                      maxDate={new Date(currentSchedule.task.activity.dueDate)}
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
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Reschedule
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

export default injectSheet(styles)(EditScheduleModal);
