import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
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

  render() {
    const { activity, classes, showEditTaskModal, task } = this.props;

    return (
      <div className={classes.task}>
        <Card variant="outlined" style={{
          backgroundColor: "#f9f9f9"
        }}>
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
                <div>
                  <Button variant="outlined" color="primary" onClick={() => { }}>
                    Schedule
          </Button>
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
          <div>
          </div>
        </Card>
      </div>
    );
  }
}

export default injectSheet(styles)(SubTask);
