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
            selectedDate: new Date(),
            currentaActivityId: 0
        };
    }

    postActivityTypeDailySchedule = async (values, formikBag, id) => {
        await axios
            .post(`${API_ENDPOINT}/activity-type-daily-schedule`, {
                userId: sessionStorage.getItem('userId'),
                activityTypeId: id,
                timeFrom: values.timeFrom.toJSON(),
                timeTo: values.timeTo.toJSON()
            })
            .then(res => this.props.hideModal())
            .catch(error => alert('Daily Schedule for Activity Type already exists!'));
    }

    postActivityType = async (values, formikBag) => {
        await axios
            .post(`${API_ENDPOINT}/activity-type`, {
                name: values.name,
            })
            .then(res => this.postActivityTypeDailySchedule(values, formikBag, res.data.id))
            .catch(error => alert('Category name already exists!'));
    }

    handleSubmit = (values, formikBag) => {
        this.postActivityType(values, formikBag);
    }

    render() {
        const { classes, hideModal } = this.props;

        return (
            <div className={classes.modal}>
                <Formik
                    onSubmit={(values, formikBag) => this.handleSubmit(values, formikBag)}
                    initialValues={{ name: '', timeFrom: new Date(), color: '', timeTo: new Date(), type: '', status: '' }}
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
                                        />
                                        <KeyboardTimePicker
                                            ampm={false}
                                            inputVariant="outlined"
                                            required
                                            label="Start time"
                                            value={formikProps.values.timeFrom}
                                            minutesStep={5}
                                            onChange={timeFrom => { formikProps.setFieldValue('timeFrom', timeFrom); }}
                                        />
                                        <KeyboardTimePicker
                                            ampm={false}
                                            required
                                            inputVariant="outlined"
                                            label="End time"
                                            minutesStep={5}
                                            value={formikProps.values.timeTo}
                                            onChange={timeTo => formikProps.setFieldValue('timeTo', timeTo)}
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
