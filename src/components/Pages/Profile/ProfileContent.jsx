import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography, Dialog, Divider } from '@material-ui/core/';
import PersonIcon from '@material-ui/icons/Person';
import UserModal from './UserModal'
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

function ProfileContent(props) {
    const [userData, setUserData] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)


    const USER_ID = sessionStorage.getItem('userId');

    console.log(userData)

    const getUserData = async () => {
        axios
            .get(`http://127.0.0.1:3000/user/${USER_ID}/`)
            .then(({ data }) => setUserData(data))
            .catch(console.log('error - no user found'))
    }

    const handleModalClose = async () => {
        setModalOpen(false)
        await getUserData()
    }

    useEffect(() => {
        getUserData()
    }, [])

    const classes = useUserDataStyles()

    return (
        <>
            <div>
                {userData && (
                    <div className={classes.userData}>
                        <List className={classes.listStyle}>
                            <Paper>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.firstName + ' ' + userData.lastName} secondary="FULL NAME" />
                                </ListItem>
                            </Paper>
                        </List>
                        <Divider />
                        <List>
                            <Paper>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <EmailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.email} secondary="EMAIL ADRESS" />
                                </ListItem>
                            </Paper>
                        </List>
                        <Divider />
                        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                            <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)} className={classes.buttonStyle}>
                                EDIT PROFILE DATA
                            </Button>
                        </div>
                    </div>)}
            </div>
            {userData && <UserModal userData={userData} open={modalOpen} onClose={handleModalClose} />}
        </>
    )
}

const useUserDataStyles = makeStyles((theme) => ({
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
    userData: {
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

/*class ProfileContent extends React.Component {

                render() {
            return (
            <div>
                < Typography variant="h1" component="h2" gutterBottom >

                </Typography >
            </div >
            );
        }
    }*/

export default ProfileContent;