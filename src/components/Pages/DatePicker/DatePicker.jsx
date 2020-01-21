import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    inputText: {
        color: "#00b0ff",
        marginRight: "auto"
    },
    iconStyle: {
        color: "#00b0ff"
    }
}));


export default function DatePicker() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-18T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const classes = useStyles();
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    animateYearScrolling
                    autoOk
                    variant="outlined"
                    margin="normal"
                    id="date-picker-inline"
                    color="secondary"
                    value={selectedDate}
                    onChange={handleDateChange}
                    allowKeyboardControl="false"
                    shrink
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    InputProps={{
                        disableUnderline: true,
                        className: classes.inputText,
                        shrink: true,
                        readOnly: true
                    }}
                    KeyboardButtonProps={{
                        className: classes.iconStyle
                    }
                    }

                />


            </Grid>
        </MuiPickersUtilsProvider>
    );
}