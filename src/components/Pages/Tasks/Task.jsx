import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import SubTask from './SubTask';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { default as BootstrapButton } from 'react-bootstrap/Button';
import { API_ENDPOINT } from '../../../api';
import axios from 'axios';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';

const styles = {
  task: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '& > div': {
      marginLeft: '16px'
    }
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
  buttons: {
    '& > button:not(:last-child)': {
      marginRight: '16px'
    }
  }
};

export class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  handleCompleteButtonClick = value => {
    axios.post(`${API_ENDPOINT}/task/${this.props.task.id}/complete`, {
      isCompleted: value
    });
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  handleDelete = () => {
    axios.delete(`${API_ENDPOINT}/task/${this.props.task.id}`);
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  handleDeleteSchedule = id => {
    axios.delete(`${API_ENDPOINT}/task/schedule/${id}`);
    setTimeout(() => this.props.refetchActivities(), 100);
  };

  getSuccessPercent(task) {
    if (task.isCompleted) {
      return 100;
    } else if (task.subTasks.length) {
      const notCompletedTasks = task.subTasks.filter(task => task.isCompleted);

      return (notCompletedTasks.length / task.subTasks.length) * 100;
    } else {
      return 0;
    }
  }

  renderButtons() {
    const { activity, classes, showAddTaskModal, showAddScheduleModal, task } = this.props;
    const { isExpanded } = this.state;

    return (
      <Fragment>
        {task.subTasks && task.subTasks.length ? (
          <Button variant="outlined" color="primary" onClick={() => showAddTaskModal(activity, task)}>
            Add subtask
          </Button>
        ) : (
          <div className={classes.buttons}>
            {task.schedules.length ? null : (
              <Button variant="outlined" color="primary" onClick={() => showAddTaskModal(activity, task)}>
                Add subtask
              </Button>
            )}
            <Button variant="outlined" color="primary" onClick={() => showAddScheduleModal(activity, task)}>
              Add to schedule
            </Button>
          </div>
        )}
        {task.subTasks.length ? (
          <div
            style={{ marginTop: '20px', marginBottom: '20px', color: '#7f868a', cursor: 'pointer' }}
            onClick={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))}
          >
            {isExpanded ? 'Hide Subtasks' : 'Show Subtasks'}
          </div>
        ) : null}
      </Fragment>
    );
  }

  render() {
    const { activity, classes, showAddScheduleModal, showEditTaskModal, task } = this.props;
    const { isExpanded } = this.state;
    const successPercent = this.getSuccessPercent(task);

    return (
      <div className={classes.task} style={{ border: `solid 2px ${activity.activityColor.value}` }}>
        <div className={classes.header}>
          <div className={classes.topActions}>
            <h2 style={{ margin: '0 16px 0 0' }}>{task.name}</h2>
            <div onClick={() => showEditTaskModal(activity, task)}>
              <EditIcon size="20" />
            </div>
            <div onClick={this.handleDelete}>
              <DeleteIcon size="20" />
            </div>
          </div>
          <div style={{ width: '100px' }}>
            <ProgressBar animated variant="success" now={successPercent} />
          </div>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Duration:</span>
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
          {!task.isCompleted && this.renderButtons()}
          {isExpanded ? (
            <div className={classes.tasks}>
              {task.subTasks &&
                task.subTasks.map(subtask => {
                  return (
                    <SubTask
                      key={subtask.id}
                      activity={activity}
                      task={subtask}
                      showAddScheduleModal={showAddScheduleModal}
                      showEditTaskModal={showEditTaskModal}
                      refetchActivities={this.props.refetchActivities}
                      classes={classes}
                    />
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Task);
