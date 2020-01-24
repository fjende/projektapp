import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(2),
        width: '90%',
        maxWidth: 400
    },
    selectEmpty: {
        marginTop: theme.spacing(5),
    },
    table: {
        width: '100%'
    },
}));



export default function StatisticsContent() {
    const classes = useStyles();
    const [currentActivity, setCurrentActivity] = React.useState('');
    const [userData, setUserData] = useState(null)
    const [statisticsData, setStatisticsData] = React.useState('');

    const USER_ID = sessionStorage.getItem('userId');

    console.log(userData);
    console.log(currentActivity);
    console.log(statisticsData);

    const getUserData = async () => {
        axios
            .get(`http://127.0.0.1:3000/user/${USER_ID}/activities`)
            .then(({ data }) => setUserData(data.activities))
            .catch(console.log('Error Getting User Data'))
    }

    const getStatisticsData = async () => {
        axios
            .get(`http://127.0.0.1:3000/activity/${currentActivity}/statistics`)
            .then(({ data }) => setStatisticsData(data))
            .catch(console.log('Error Getting Statistics Data'))
    }

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        getStatisticsData();
    }, [currentActivity])

    const handleChange = async event => {
        await setCurrentActivity(event.target.value);
    }

    return (
        <div>
            {userData && (
                <div className={classes.root}>
                    <Grid container spacing={2} justify="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Activity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={currentActivity}
                                    onChange={handleChange}
                                >
                                    {userData.map(activity => (
                                        <MenuItem key={activity.id} value={activity.id}>
                                            {activity.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="statistics table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Time Spent:
                                            </TableCell>
                                            <TableCell align="right">{statisticsData.time_spent}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Total number of Tasks:
                                            </TableCell>
                                            <TableCell align="right">{statisticsData.number_of_tasks}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Numer of future Tasks:
                                            </TableCell>
                                            <TableCell align="right">{statisticsData.number_of_future_tasks}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Time Remaining:
                                            </TableCell>
                                            <TableCell align="right">{statisticsData.time_remaining}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </div>)}
        </div>
    );
}