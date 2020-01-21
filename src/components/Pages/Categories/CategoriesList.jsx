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
import axios from "axios";



export default function CategoriesList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' }
        ],
        data: [{
            id: "",
            name: ""
        }]
    });

    return (
        <MaterialTable
            columns={state.columns}
            data={query =>
                new Promise((resolve, reject) => {
                    let url = 'http://127.0.0.1:3000/activity-type/'
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            resolve({
                                data: result
                            })
                            console.log(result);
                        })
                })}
            options={{
                paging: false,
                showTitle: false,
                searchFieldAlignment: 'left',
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
                onRowAdd: (newData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            axios
                                .post('http://127.0.0.1:3000/activity-type/', newData)
                                .then(res => console.log(res.data));
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            console.log("Update id:");
                            console.log(oldData.id);

                            data[data.indexOf(oldData)] = newData;
                            axios
                                .put('http://127.0.0.1:3000/activity-type/' + oldData.id, newData)
                                .then(res => console.log(res.data));
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            console.log("Delte id:");
                            console.log(oldData.id);
                            data.splice(data.indexOf(oldData), 1);
                            axios
                                .delete('http://127.0.0.1:3000/activity-type/' + oldData.id)
                                .then(res => console.log(res.data));
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}