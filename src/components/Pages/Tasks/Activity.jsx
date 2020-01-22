import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Task from './Task';
import DeleteIcon from '../../../icons/DeleteIcon';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import EditIcon from '../../../icons/EditIcon';
import Button from '@material-ui/core/Button';

const styles = {
  activity: {
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
    color: '#7f868a',
    fontSize: '18px'
  },
  text: {
    fontSize: '18px'
  },
  tasks: {
    marginTop: '20px'
  }
};

export class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  handleDelete = id => {
    axios.delete(`${API_ENDPOINT}/activity/${id}`).then(() => this.props.refetchActivities());
  };

  render() {
    const { activity, classes, showAddTaskModal } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={classes.activity} style={{ border: `solid 1px ${activity.activityColor.value}` }}>
        <div className={classes.header}>
          <h1>{activity.name}</h1>
          <div className={classes.icons}>
            <div style={{ cursor: 'pointer' }} onClick={() => this.props.showEditActivityModal(activity)}>
              <EditIcon size="30" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(activity.id)}>
              <DeleteIcon size="30" />
            </div>
          </div>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Due Date:</span>
          <span className={classes.text}>{new Date(activity.dueDate).toLocaleDateString()}</span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Status:</span>
          <span className={classes.text}>{activity.activityStatus.name}</span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Type:</span>
          <span className={classes.text}>{activity.activityType.name}</span>
        </div>
        <Button variant="outlined" color="primary" onClick={() => showAddTaskModal(activity)}>
          Add task
        </Button>
        {activity.tasks.length ? (
          <div
            style={{ marginTop: '20px', color: '#7f868a', cursor: 'pointer' }}
            onClick={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))}
          >
            {isExpanded ? 'Hide Tasks' : 'Show Tasks'}
          </div>
        ) : null}
        {isExpanded ? (
          <div className={classes.tasks}>
            {activity.tasks.map(task => (
              <Task
                key={task.id}
                activity={activity}
                task={task}
                showAddTaskModal={() => showAddTaskModal(activity, task)}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default injectSheet(styles)(Activity);
