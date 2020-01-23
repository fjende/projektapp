import React, { Component } from 'react';
import injectSheet from 'react-jss';

const styles = {
  scheduleEntry: {
    width: '100%',
    padding: '20px',
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
    marginBottom: '15px',

    '& > span:not(:last-child)': {
      marginRight: '10px'
    }
  },
  label: {
    color: '#000f16'
  },
  text: {
    fontSize: '18px'
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
        style={{ border: `solid 3px ${schedule.task.activity.activityColor.value}` }}
      >
        <h1>{schedule.task.name}</h1>
        <div className={classes.header}>
          <h3>
            {new Date(schedule.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
              ' - ' +
              new Date(schedule.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h3>
          <div style={{ cursor: 'pointer' }} onClick={() => showEditScheduleModal(schedule)}>
            Reschedule
          </div>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Due Date:</span>
          <span className={classes.text}>{new Date(schedule.task.activity.dueDate).toLocaleDateString()}</span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Status:</span>
          <span className={classes.text}>{schedule.task.activity.activityStatus.name}</span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Type:</span>
          <span className={classes.text}>{schedule.task.activity.activityType.name}</span>
        </div>
        <h4 className={classes.label}>{schedule.isFixed ? 'Fixed' : 'Not fixed'}</h4>
      </div>
    );
  }
}

export default injectSheet(styles)(ScheduleEntry);
