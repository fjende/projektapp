import React from 'react';
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        width: '100%'
    },
}));
function createData(name, timespent, ntasks, nfuturetasks, tfuture) {
    return { name, timespent, ntasks, nfuturetasks, tfuture };
}
const rows = [
    createData('Total time spent:', 159),
    createData('Number of tasks:', 237),
    createData('Number of future tasks:', 262),
    createData('Time needed in the future:', 305),
];
export default function StatisticsContent() {
    const classes = useStyles();
    const [category, setCategory] = React.useState('');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = event => {
        setCategory(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="category-select">Category</InputLabel>
                        <Select
                            labelId="Select Category"
                            id="category-select"
                            value={category}
                            onChange={handleChange}
                        >
                            <MenuItem value={'Sport'}>Sport</MenuItem>
                            <MenuItem value={'Ucenje'}>Ucenje</MenuItem>
                            <MenuItem value={'Zabava'}>Zabava</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="statistics table">
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.timespent}</TableCell>
                                        <TableCell align="right">{row.ntasks}</TableCell>
                                        <TableCell align="right">{row.nfuturetasks}</TableCell>
                                        <TableCell align="right">{row.tfuture}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </div>
    );
}