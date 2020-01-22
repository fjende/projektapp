import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';

const styles = {
  task: {
    width: '50%',
    marginBottom: '20px',
    padding: '10px',
    border: 'solid 1px rgba(0,0,0,0.12)',
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

export class Task extends Component {
  render() {
    const { activity, classes, showAddTaskModal, task } = this.props;

    return (
      <div className={classes.task}>
        <div className={classes.header}>
          <h2>{task.name}</h2>
          <span style={{ color: task.isComplete ? 'green' : 'red' }}>
            {task.isComplete ? 'Finished' : 'Not finished yet'}
          </span>
        </div>
        <div className={classes.textContent}>
          <span className={classes.label}>Duration</span>
          <span className={classes.text}>{`${task.durationHours} hours`}</span>
        </div>
        <div
          style={{ marginTop: '20px', color: '#7f868a', cursor: 'pointer' }}
          onClick={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))}
        ></div>
        <div>
          {task.subTasks.length ? (
            <Button variant="outlined" color="primary" onClick={() => showAddTaskModal(activity)}>
              Add subtask
            </Button>
          ) : (
            <div>
              <Button variant="outlined" color="primary" onClick={() => showAddTaskModal(activity, task)}>
                Add subtask
              </Button>
              <Button variant="outlined" color="primary" onClick={() => {}}>
                Add to schedule
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Task);
