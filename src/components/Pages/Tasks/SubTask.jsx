import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import { default as BootstrapButton } from 'react-bootstrap/Button';
import { API_ENDPOINT } from '../../../api';
import axios from 'axios';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';

const styles = {
  task: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    transition: 'ease-all 0.5s'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textContent: {
    display: 'flex',
    alignItems: 'center',
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
  tasks: {}
};

export class SubTask extends Component {
  handleCompleteButtonClick = value => {
    axios.post(`${API_ENDPOINT}/task/${this.props.task.id}/complete`, {
      isCompleted: value
    });
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  handleDelete = task => {
    axios.delete(`${API_ENDPOINT}/task/${this.props.task.id}`);
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  handleDeleteSchedule = id => {
    axios.delete(`${API_ENDPOINT}/task/schedule/${id}`);
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  render() {
    const { activity, classes, showAddScheduleModal, showEditTaskModal, task } = this.props;
    return (
      <div className={classes.task} style={{ border: `dashed 1px ${activity.activityColor.value}` }}>
        <div className={classes.header}>
          <div className={classes.topActions}>
            <h2 style={{ margin: '0 16px 0 0' }}>{task.name}</h2>
            <div onClick={() => showEditTaskModal(activity, task)}>
              <EditIcon size="18" />
            </div>
            <div onClick={() => this.handleDelete(task)}>
              <DeleteIcon size="20" />
            </div>
          </div>
          <span style={{ color: task.isCompleted ? 'green' : 'red' }}>
            {task.isCompleted ? 'Finished' : 'Not finished yet'}
          </span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Duration</span>
          <span className={classes.text}>{`${task.durationHours} hours`}</span>
        </div>
        {task.schedules.length
          ? task.schedules
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((schedule, index) => {
                return (
                  <div className={classes.textContent} key={index}>
                    <span className={classes.label}>Schedule #{index + 1}</span>
                    <span className={classes.text}>
                      {new Date(schedule.date).toLocaleDateString() +
                        '  ' +
                        new Date(schedule.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
                        ' - ' +
                        new Date(schedule.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={() => this.handleDeleteSchedule(schedule.id)}>
                      <DeleteIcon size="20" />
                    </span>
                  </div>
                );
              })
          : null}
        <div style={{ marginBottom: '10px' }}>
          <BootstrapButton
            variant={task.isCompleted ? 'success' : 'danger'}
            onClick={() => this.handleCompleteButtonClick(!task.isCompleted)}
          >
            {task.isCompleted ? 'Done' : 'To do'}
          </BootstrapButton>
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={() => showAddScheduleModal(activity, task)}>
            Add to schedule
          </Button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(SubTask);
