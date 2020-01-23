import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography, Dialog } from '@material-ui/core/';

import UserModal from './UserModal'
import axios from 'axios';

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

    const styles = useUserDataStyles()

    return (
        <>
            <div className={styles.userData}>
                {userData && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" className={styles.title}>
                                {userData.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" className={styles.title}>
                                {userData.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={styles.title}>
                                {userData.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={styles.title}>
                                {userData.password}
                            </Typography>
                        </Grid>
                    </>
                )}
                <Button variant='contained' className={styles.edit} onClick={() => setModalOpen(true)}>
                    Edit
                </Button>
            </div>
            {userData && <UserModal userData={userData} open={modalOpen} onClose={handleModalClose} />}
        </>
    )
}

const useUserDataStyles = makeStyles((theme) => ({
    userData: {
        maxWidth: '500px',
    },
    title: {
        fontSize: '24',
    },
    edit: {
        paddingTop: '20px',
        width: '100px',
        height: '40px',
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