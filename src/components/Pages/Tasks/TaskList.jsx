import React from 'react';
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
    data: [
      {
        id: '',
        name: '',
        dueDate: '',
        activityType: '',
        activityColor: ''
      }
    ]
  });
  const USER_ID = sessionStorage.getItem('userId');

  const [open, setOpen] = React.useState(false);

  const [editData, setEditData] = React.useState('0');

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const tableRef = useRef(null);

  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
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
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              render={formikProps => {
                return (
                  <Form className={classes.form}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleClose} color="primary">
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
              handleClickOpen();
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
  );
}
