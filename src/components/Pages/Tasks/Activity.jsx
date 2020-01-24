import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Task from './Task';
import DeleteIcon from '../../../icons/DeleteIcon';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import EditIcon from '../../../icons/EditIcon';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';


const styles = {
  activity: {
    width: '100%',
    paddingBottom: '20px',
    backgroundColor: '#fff',
  },
  cardContent: {
    paddingBottom: '6px',
  },
  cardActions: {
    padding: '0px',
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
  tasks: {
    marginTop: '20px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginRight: 'auto',
  },
  shape: {
    width: 50,
    height: 6,
  },
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
    const {
      activity,
      classes,
      showAddTaskModal,
      showAddScheduleModal,
      showEditScheduleModal,
      showEditTaskModal
    } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={classes.activity} style={{ backgroundColor: `solid 3px ${activity.activityColor.value}` }}>
        <Card variant="outlined" style={{
          backgroundColor: "#fefefe"
        }}>
          <CardContent className={classes.cardContent}>
            <div className={classes.shape} style={{ backgroundColor: `${activity.activityColor.value}` }} />
            <div className={classes.header}>
              <h4>{activity.name}</h4>
              <div className={classes.icons}>
                <div style={{ cursor: 'pointer' }} onClick={() => this.props.showEditActivityModal(activity)}>
                  <EditIcon size="20" />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(activity.id)}>
                  <DeleteIcon size="20" />
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
            <CardActions style={{ padding: 0, marginTop: '5px' }}>
              <Button
                variant="outlined"
                color="#fafafa"
                onClick={() => showAddTaskModal(activity)}
                aria-label="Add Task"
              >
                Add Task
            </Button>
              {activity.tasks.length ? (
                <IconButton
                  className={classes.expand}
                  onClick={() => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))}
                  aria-expanded={isExpanded}
                  aria-label="Show Tasks"
                >
                  <ExpandMoreIcon />
                </IconButton>
              ) : null}
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className={classes.tasks}>
                  {activity.tasks
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(task =>
                      !task.superTask ? (
                        <Task
                          key={task.id}
                          activity={activity}
                          task={task}
                          refetchActivities={this.props.refetchActivities}
                          showAddTaskModal={() => showAddTaskModal(activity, task)}
                          showAddScheduleModal={showAddScheduleModal}
                          showEditTaskModal={showEditTaskModal}
                        />
                      ) : null
                    )}
                </div>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
      </div >
    );
  }
}

export default injectSheet(styles)(Activity);
