import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography, Dialog, Divider } from '@material-ui/core/';
import PersonIcon from '@material-ui/icons/Person';
import AddCategoryModal from './AddCategoryModal'
import axios from 'axios';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar';
import { textAlign } from '@material-ui/system';
import { API_ENDPOINT } from '../../../api';

function ProfileContent(props) {
    const [data, setData] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const USER_ID = sessionStorage.getItem('userId');

    console.log(data)
    console.log(`${API_ENDPOINT}/activity-type`);
    const getData = async () => {
        axios
            .get(`${API_ENDPOINT}/activity-type`)
            .then(({ data }) => setData(data)
                .then(console.log(data))
                .catch(console.log('Error - No Activity_Types Found'))
    }

    const handleModalClose = async () => {
        setModalOpen(false)
        await getData()
    }

    useEffect(() => {
        getData()
    }, [])

    const classes = useCategoryStyles()

    return (
        <>
            <div>
                {data && (
                    <div className={classes.data}>
                        <List className={classes.listStyle}>
                            <Paper>
                                <ListItem >
                                    <ListItemText primary={data.name} secondary="CATEGORY NAME" />
                                </ListItem>
                            </Paper>
                        </List>
                        <Divider />
                        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                            <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)} className={classes.buttonStyle}>
                                ADD NEW CATEGORY
                            </Button>
                        </div>
                    </div>)}
            </div>
            {/*  {data && <AddCategoryModal data={data} open={modalOpen} onClose={handleModalClose} />}  */}
        </>
    )
}

const useCategoryStyles = makeStyles((theme) => ({
    listStyle: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    buttonStyle: {
        marginTop: '10px',
        width: '300px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        }
    },
    data: {
        maxWidth: '100%',
        paddingLeft: '10px'
    },
    title: {
        fontSize: '18',
    },
    task: {
        width: '50%',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContent: {
        marginBottom: '15px',
        '& > span:not(:last-child)': {
            marginRight: '10px'
        }
    },
    label: {
        color: '#7f868a',
        fontSize: '18px'
    },
    text: {
        fontSize: '18px'
    },
    buttons: {
        '& > button:not(:last-child)': {
            marginRight: '16px'
        }
    }
}))

export default ProfileContent;