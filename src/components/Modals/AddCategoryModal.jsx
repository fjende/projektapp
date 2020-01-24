import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';
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

export class AddCategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date()
    };
  }

  handleSubmit = async (values, formikBag) => {};

  postDailySchedule = (values, formikBag) => {
    axios
      .post(`${API_ENDPOINT}/activity-type-daily-schedule`, {
        name: values.name,
        userId: sessionStorage.getItem('userId')
      })
      .catch(error => alert('Category name already exists!'));
  };

  postActivityType = async values => {
    await axios
      .post(`${API_ENDPOINT}/activity-type`, {
        name: values.name
      })
      .catch(error => alert('Category name already exists!'));
  };

  render() {
    const { classes, hideModal } = this.props;

    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => this.handleSubmit(values, formikBag)}
          initialValues={{ name: '', date: new Date(), color: '', type: '', status: '' }}
          render={formikProps => {
            return (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    <KeyboardTimePicker
                      ampm={false}
                      inputVariant="outlined"
                      label="Start time"
                      value={formikProps.values.timeFrom}
                      minutesStep={5}
                      onChange={date => {
                        formikProps.setFieldValue('timeFrom', date);
                        console.log(date);
                      }}
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
                      Create
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

export default injectSheet(styles)(AddCategoryModal);
