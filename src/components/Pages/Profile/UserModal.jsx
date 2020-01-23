import React, { useRef } from 'react'
import { Dialog, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import axios from 'axios';
import { registerValidationSchema } from '../Login/validation';
import { Route, withRouter } from "react-router";

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

function UserModal({ userData, open, onClose, ...rest }) {
    const { firstName, lastName, email, password } = userData

    const USER_ID = sessionStorage.getItem('userId');

    const classes = useStyles()
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Your Data</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={(values, formikBag) => {
                        axios
                            .put(`http://127.0.0.1:3000/user/${USER_ID}/`, {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password
                            })
                            .then(onClose)
                            .finally(() => formikBag.resetForm());
                    }}
                    validationSchema={registerValidationSchema}
                    initialValues={userData}
                    render={formikProps => {
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
                                <DialogActions>
                                    <Button onClick={onClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Save
                                    </Button>
                                </DialogActions>
                            </Form>
                        );
                    }}
                ></Formik>
            </DialogContent>

        </Dialog>
    )
}

export default withRouter(UserModal);