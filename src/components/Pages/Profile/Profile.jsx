import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ProfileContent from './ProfileContent';
import NavBar from '../Nav/NavBar'

const drawerWidth = 290;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: 0
        }
    }
}));

function Profle(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar />
            <div className={classes.content}>
                <Paper variant="outlined">
                    <ProfileContent />
                </Paper>
            </div>
        </div>
    );
}

export default Profle;
