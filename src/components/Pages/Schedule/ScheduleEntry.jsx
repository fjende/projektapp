import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '../../../icons/EditIcon';
import CardHeader from '@material-ui/core/CardHeader';
import UpdateIcon from '@material-ui/icons/Update';

const styles = {
  scheduleEntry: {
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px 0 rgba(1, 55, 79, 0.05)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    '& > div:not(:last-child)': {
      marginRight: '20px'
    }
  },
  textContent: {
    marginBottom: '5px',

    '& > span:not(:last-child)': {
      marginRight: '10px'
    }
  },
  label: {
    color: '#000f16'
  },
  text: {
    fontSize: '14px'
  },
  tasks: {
    marginTop: '20px'
  }
};

export class ScheduleEntry extends Component {
  render() {
    const { classes, schedule, showEditScheduleModal } = this.props;

    return (

      <div
        className={classes.scheduleEntry}
      >
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe"
                style={{ backgroundColor: `${schedule.task.activity.activityColor.value}` }}>
                {schedule.task.activity.activityType.name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="reschedule" onClick={() => showEditScheduleModal(schedule)}>
                <UpdateIcon />
              </IconButton>
            }
            title={schedule.task.name}
            subheader={new Date(schedule.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
              ' - ' +
              new Date(schedule.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <CardContent>
            <div className={classes.textContent}>
              <span className={classes.label}>Due Date:</span>
              <span className={classes.text}>{new Date(schedule.task.activity.dueDate).toLocaleDateString()}</span>
            </div>
            <div className={classes.textContent}>
              <span className={classes.label}>Status:</span>
              <span className={classes.text}>{schedule.task.activity.activityStatus.name}</span>
            </div>
            <div className={classes.textContent}>
              <span className={classes.label}>Category:</span>
              <span className={classes.text}>{schedule.task.activity.activityType.name}</span>
            </div>
            {/* <h4 className={classes.label}>{schedule.isFixed ? 'Fixed' : 'Not fixed'}</h4>  */}
          </CardContent>
        </Card>
      </div >

    );
  }
}

export default injectSheet(styles)(ScheduleEntry);
