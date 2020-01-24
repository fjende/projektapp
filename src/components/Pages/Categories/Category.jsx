import React, { Component } from 'react';
import injectSheet from 'react-jss';
import DeleteIcon from '../../../icons/DeleteIcon';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import EditIcon from '../../../icons/EditIcon';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import UpdateIcon from '@material-ui/icons/Update';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    activity: {
        width: '100%',
        paddingBottom: '20px',
        backgroundColor: '#fff'
    },
    cardContent: {
        paddingBottom: '6px'
    },
    cardActions: {
        padding: '0px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
        justifyContent: 'space-between',
        color: '#3c3b3b'
    },
    icons: {
        display: 'flex',
        alignItems: 'center',
        '& > div:not(:last-child)': {
            marginRight: '20px'
        }
    },
    textContent: {
        '& > span:not(:last-child)': {
            marginRight: '10px'
        }
    },
    label: {
        color: '#7f868a',
        fontSize: '14px'
    },
    text: {
        fontSize: '14px'
    },
    tasks: {
        marginTop: '20px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginRight: 'auto'
    },
    shape: {
        width: 50,
        height: 6
    }
};

export class Category extends Component {
    constructor(props) {
        super(props);
    }

    handleDelete = (id, userId, typeId, timeFrom) => {
        axios
            .delete(`${API_ENDPOINT}/activity-type-daily-schedule/${id}/${typeId}`)
            .then(() => this.props.refetchActivities())
            .then(res => console.log(res));
    };

    handleEdit = id => {
        alert('Todo');
    };

    render() {
        const { category, classes, showAddCategoryModal, showEditCategoryModal } = this.props;

        return (
            <div className={classes.activity}>
                <Card
                    variant="outlined"
                    style={{
                        backgroundColor: '#fefefe'
                    }}
                >
                    <CardContent className={classes.cardContent}>
                        <div className={classes.header}>
                            <h4>{category.activityType.name}</h4>
                            <div className={classes.icons}>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        this.handleDelete(category.id, category.user.id, category.activityType.id, category.timeFrom)
                                    }
                                >
                                    <DeleteIcon size="20" />
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={() => showEditCategoryModal(category)}>
                                    <UpdateIcon size="20" />
                                </div>
                            </div>
                        </div>
                        <div className={classes.textContent}>
                            <span className={classes.label}> SCHEDULE: </span>
                            <span className={classes.text}>
                                {new Date(category.timeFrom).toLocaleTimeString()} to {new Date(category.timeTo).toLocaleTimeString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default injectSheet(styles)(Category);
