import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import { default as BootstrapButton } from 'react-bootstrap/Button';
import { API_ENDPOINT } from '../../../api';
import axios from 'axios';

const styles = {
  task: {
    width: '50%',
    marginBottom: '20px',
    padding: '10px',
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
  tasks: {}
};

export class SubTask extends Component {
  handleCompleteButtonClick = value => {
    axios.post(`${API_ENDPOINT}/task/${this.props.task.id}/complete`, {
      isCompleted: value
    });
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  render() {
    const { activity, classes, task } = this.props;

    return (
      <div className={classes.task} style={{ border: `solid 1px ${activity.activityColor.value}` }}>
        <div className={classes.header}>
          <h4>{task.name}</h4>
          <span style={{ color: task.isCompleted ? 'green' : 'red' }}>
            {task.isCompleted ? 'Finished' : 'Not finished yet'}
          </span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Duration</span>
          <span className={classes.text}>{`${task.durationHours} hours`}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <BootstrapButton
            variant={task.isCompleted ? 'success' : 'danger'}
            onClick={() => this.handleCompleteButtonClick(!task.isCompleted)}
          >
            {task.isCompleted ? 'Done' : 'To do'}
          </BootstrapButton>
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={() => {}}>
            Add to schedule
          </Button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(SubTask);