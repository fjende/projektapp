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
import { typeParameterInstantiation, typeAlias } from '@babel/types';

const styles = {
  inputs: {
    marginBottom: '20px',
    '& > div': {
      marginBottom: '20px'
    }
  }
};

export class AddActivityModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date()
    };
  }

  render() {
    const { classes, hideModal, colors, statuses, types } = this.props;

    return (
      <div className={classes.modal}>
        <Formik
          onSubmit={(values, formikBag) => {
            axios
              .post(`${API_ENDPOINT}/activity`, {
                name: values.name,
                dueDate: values.date,
                userId: sessionStorage.getItem('userId'),
                typeId: values.type,
                colorId: values.color,
                statusId: values.status
              })
              .then(() => hideModal())
              .catch(error => alert('Activity name already exists!'));
          }}
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
                    <KeyboardDateTimePicker
                      inputVariant="outlined"
                      format="yyyy/MM/dd HH:mm"
                      disablePast
                      value={formikProps.values.date}
                      onChange={date => formikProps.setFieldValue('date', date)}
                      format="yyyy/MM/dd HH:mm"
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={formikProps.values.color}
                        onChange={event => formikProps.setFieldValue('color', event.target.value)}
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        {colors.map(color => (
                          <MenuItem key={color.id} value={color.id}>
                            {color.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={formikProps.values.status}
                        onChange={event => formikProps.setFieldValue('status', event.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {statuses.map(status => (
                          <MenuItem value={status.id}>{status.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={formikProps.values.type}
                        onChange={event => formikProps.setFieldValue('type', event.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {types.map(type => (
                          <MenuItem value={type.activityType.id}>{type.activityType.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default injectSheet(styles)(AddActivityModal);
