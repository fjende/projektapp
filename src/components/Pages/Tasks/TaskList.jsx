import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import SortArrow from '@material-ui/icons/Sort';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { loginValidationSchema } from './validation';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import RefreshIcon from '@material-ui/icons/Refresh';

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
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  datePicker: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  select: {
    display: 'flex',
    marginTop: theme.spacing(2)
  }
}));

export default function TaskList() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Due', field: 'dueDate' },
      { title: 'Category', field: 'activityType.name' },
      { title: 'Color', field: 'activityColor.name' }
    ],
    currentActivity: {
      name: '',
      activityColor: null
    },
    colors: null,
    statuses: null,
    types: null
  });

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/activity-color`).then(response => setState({ ...state, colors: response.data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data]);

  const USER_ID = sessionStorage.getItem('userId');

  const [open, setOpen] = React.useState(false);

  const [editData, setEditData] = React.useState('0');

  function handleClickOpen(rowData) {
    setState({ ...state, currentActivity: rowData });
    console.log(rowData);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const tableRef = useRef(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
              {console.log(state.currentActivity)}
              <Formik
                onSubmit={(values, formikBag) => {
                  axios
                    .put(`${API_ENDPOINT}/activity/` + state.editrowData.id, {
                      email: values.email,
                      password: values.password
                    })
                    .then(response => {
                      console.log(response.data);
                    })
                    .catch(() => alert('Wrong Inputs!'))
                    .finally(() => formikBag.resetForm());
                }}
                enableReinitialize
                initialValues={{
                  name: state.currentActivity.name || '',
                  color: state.currentActtivity ? state.currentActivity.activityColor.name : -1
                }}
                validationSchema={loginValidationSchema}
                render={formikProps => {
                  console.log(state.currentActivity);
                  return (
                    <Form className={classes.form}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.input}
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                      />
                      <KeyboardDatePicker
                        clearable
                        className={classes.datePicker}
                        inputVariant="outlined"
                        placeholder="10/10/2018"
                        value={state.currentActivity.dueDate}
                        onChange={date =>
                          setState({ ...state, currentActivity: { ...state.currentActivity, dueDate: date } })
                        }
                        label="Due Date"
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                      />
                      <FormControl variant="outlined" className={classes.select}>
                        <InputLabel>Color</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={formikProps.values.color}
                          onChange={event => formikProps.setFieldValue('color', event.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {state.colors.map(color => (
                            <MenuItem value={color.id}>{color.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant="outlined" className={classes.select}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={() => {}}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="outlined" className={classes.select}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={() => {}}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
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
        </div>
        <MaterialTable
          tableRef={tableRef}
          columns={state.columns}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'http://127.0.0.1:3000/user/' + USER_ID + '/activities';
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.activities
                  });
                  console.log(result);
                });
            })
          }
          options={{
            paging: false,
            draggable: false,
            sorting: false,
            showTitle: false,
            searchFieldAlignment: 'left',
            headerStyle: {
              color: '#00b0ff'
            },
            actionsCellStyle: {
              color: '#6d6d6e'
            }
          }}
          localization={{
            body: {
              editRow: {
                deleteText: ''
              }
            }
          }}
          actions={[
            {
              icon: RefreshIcon,
              tooltip: 'Refresh',
              isFreeAction: true,
              onClick: () => tableRef.current && tableRef.current.onQueryChange()
            },
            {
              icon: Add,
              tooltip: 'Add Task',
              isFreeAction: true,
              onClick: (event, rowData) => {
                alert('Add new Task');
              }
            },
            {
              icon: Edit,
              tooltip: 'Edit Task',
              onClick: (event, rowData) => {
                handleClickOpen(rowData);
              }
            }
          ]}
          icons={{
            Check: Check,
            DetailPanel: ChevronRight,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Search: Search,
            Remove: Remove,
            Add: Add,
            ThirdStateCheck: Remove,
            Edit: Edit,
            Delete: Delete,
            ResetSearch: ClearIcon,
            Cancel: CancelIcon,
            Clear: ClearIcon,
            SortArrow: ArrowUpward
          }}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  console.log('Delte id:');
                  console.log(oldData.id);
                  data.splice(data.indexOf(oldData), 1);
                  axios.delete('http://127.0.0.1:3000/activity/' + oldData.id).then(res => console.log(res.data));
                  setState({ ...state, data });
                }, 600);
              })
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
