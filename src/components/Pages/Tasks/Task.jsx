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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox'

const styles = {
  task: {
    marginBottom: '20px',
    backgroundColor: '#fefefe'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
    justifyContent: 'space-between',
    color: '#3c3b3b'
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    '& > div:not(:last-child)': {
      marginRight: '20px'
    }
  },
  textContent: {

    '& > span:not(:last-child)': {
      marginRight: '10px'
    }
  },
  label: {
    color: '#7f868a',
    fontSize: '14px'
  },
  text: {
    fontSize: '14px'
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

  handleDelete = task => {
    axios.delete(`${API_ENDPOINT}/task/${this.props.task.id}`);
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
    const { activity, classes, showAddTaskModal, task } = this.props;
    const { isExpanded } = this.state;

    return (
      <Fragment>

        {task.subTasks && task.subTasks.length ? (
          <Button variant="outlined" color="#fafafa" onClick={() => showAddTaskModal(activity, task)}>
            Add subtask
          </Button>
        ) : (
            <div className={classes.buttons}>
              <Button variant="outlined" color="#fafafa" onClick={() => showAddTaskModal(activity, task)}>
                Add subtask
            </Button>
              <Button variant="outlined" color="#fafafa" onClick={() => { }}>
                Add to schedule
            </Button>
            </div>
          )}
        {task.subTasks.length ? (
          <IconButton
            className={classes.expand}
            onClick={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))}
            aria-expanded={isExpanded}
            aria-label="Show Subasks"
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : null}
      </Fragment>
    );
  }

  render() {
    const { activity, classes, showEditTaskModal, task } = this.props;
    const { isExpanded } = this.state;
    const successPercent = this.getSuccessPercent(task);

    return (
      <div className={classes.task}>
        <Card variant="outlined">
          <CardContent className={classes.cardContent}>
            <div className={classes.header}>
              <h4 style={{ margin: '0 16px 0 0' }}>{task.name}</h4>
              <div className={classes.icons}>
                <div>
                  <BootstrapButton
                    variant={task.isCompleted ? 'success' : 'danger'}
                    onClick={() => this.handleCompleteButtonClick(!task.isCompleted)}
                  >
                    {task.isCompleted ? 'Finished' : 'Unfinished'}
                  </BootstrapButton>
                </div>
                <div style={{ width: 100 }}>
                  <ProgressBar animated variant="success" now={successPercent} />
                </div>
                <div onClick={() => showEditTaskModal(activity, task)}>
                  <EditIcon size="20" />
                </div>
                <div onClick={() => this.handleDelete(task)}>
                  <DeleteIcon size="20" />
                </div>
              </div>

            </div>
            <div className={classes.textContent}>
              <span className={classes.label}>Duration:</span>
              <span className={classes.text}>{`${task.durationHours} hours`}</span>
            </div>
          </CardContent>
          <CardActions style={{ marginLeft: '6px' }}>
            {!task.isCompleted && this.renderButtons()}
          </CardActions>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div className={classes.tasks}>
                {task.subTasks &&
                  task.subTasks.map(subtask => {
                    return (
                      <SubTask
                        key={subtask.id}
                        activity={activity}
                        task={subtask}
                        showEditTaskModal={showEditTaskModal}
                        refetchActivities={this.props.refetchActivities}
                        classes={classes}
                      />
                    );
                  })}
              </div>

            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default injectSheet(styles)(Task);
