import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));

export default function StatisticsContent() {
    const classes = useStyles();


    return (
        <div className={classes.root}>

            <Grid container spacing={2} justify="center"
                alignItems="center">

            </Grid>

        </div>
    );
}