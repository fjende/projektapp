import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

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
import Add from '@material-ui/icons/Add'
import SortArrow from '@material-ui/icons/Sort';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CancelIcon from '@material-ui/icons/Cancel';



export default function TaskList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name', },
            { title: 'Due Date', field: 'dueDate', },
            { title: 'User', field: 'userId', },
            { title: 'Status', field: 'statusId', },
            { title: 'Color', field: 'colorId', },
        ],
        data: [

            {
                name: 'Teski parti', dueDate: '2020-1-23', userId: 1, statusId: 1, colorId: 2
            },
            {
                name: 'Opet parti', dueDate: '2020-1-23', userId: 1, statusId: 1, colorId: 2
            },
            {
                name: 'Ucenje', dueDate: '2020-1-22', userId: 1, statusId: 1, colorId: 2
            },
            {
                name: 'Nista', dueDate: '2020-1-21', userId: 1, statusId: 1, colorId: 2
            },
            {
                name: 'Avioni', dueDate: '2020-1-20', userId: 1, statusId: 1, colorId: 2
            },
        ],
    });

    return (
        <MaterialTable
            columns={state.columns}
            data={state.data}
            options={{
                paging: false,
                showTitle: false,
                searchFieldAlignment: 'left',
                searchFieldStyle: {

                },
                headerStyle: {
                    color: '#00b0ff',

                },
                actionsCellStyle: {
                    color: '#6d6d6e',

                }

            }}
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
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}