import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import LoadingSpinner from '../../../icons/LoadingSpinner';
import Activity from './Activity';
import { Button } from '@material-ui/core';
import { MODAL_ADD_ACTIVITY, MODAL_EDIT_ACTIVITY, MODAL_ADD_TASK } from '../../../modal';
import ProjektModal from '../../Modals/Modal';

const styles = {
  activitiesPage: {
    display: 'flex',
    padding: '20px',
    backgroundColor: '#fafafa'
  },
  content: {
    flexDirection: 'column',
    width: '100%',

    '& > div': {
      marginBottom: '20px'
    }
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    width: '100%'
  }
};

export class NewTaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      activities: [],
      colors: [],
      types: [],
      statuses: [],
      currentModal: null,
      currentActivity: null,
      currentTask: null
    };
  }

  componentDidMount() {
    this.handleActivityFetching();

    axios.get(`${API_ENDPOINT}/activity-color`).then(response => this.setState({ colors: response.data }));
    axios.get(`${API_ENDPOINT}/activity-type`).then(response => this.setState({ types: response.data }));
    axios.get(`${API_ENDPOINT}/activity-status`).then(response => this.setState({ statuses: response.data }));
  }

  handleActivityFetching = () => {
    const userId = sessionStorage.getItem('userId');

    this.setState({ isLoading: true });

    return axios
      .get(`${API_ENDPOINT}/user/${userId}/activities`)
      .then(response => this.setState({ activities: response.data.activities }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleShowModal = (modal, activity, task) => {
    debugger;
    this.setState({ currentModal: modal, currentActivity: activity, currentTask: task });
  };

  handleCloseModal = () => {
    this.setState({ currentModal: '' });
    this.handleActivityFetching();
  };

  renderAddActivityModal() {
    const { colors, statuses, types } = this.state;

    return (
      <ProjektModal
        modalType={MODAL_ADD_ACTIVITY}
        colors={colors}
        statuses={statuses}
        types={types}
        hideModal={this.handleCloseModal}
      />
    );
  }

  renderEditActivityModal() {
    const { currentActivity, colors, statuses, types } = this.state;

    return (
      <ProjektModal
        modalType={MODAL_EDIT_ACTIVITY}
        colors={colors}
        statuses={statuses}
        types={types}
        currentActivity={currentActivity}
        hideModal={this.handleCloseModal}
      />
    );
  }

  renderAddTaskModal() {
    const { currentActivity, currentTask } = this.state;

    return (
      <ProjektModal
        modalType={MODAL_ADD_TASK}
        currentActivity={currentActivity}
        currentTask={currentTask}
        hideModal={this.handleCloseModal}
      />
    );
  }

  renderLoadingSpinner() {
    const { classes } = this.props;

    return (
      <div className={classes.loadingWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  renderContent() {
    const { activities } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div>
          <Button variant="contained" color="primary" onClick={() => this.handleShowModal(MODAL_ADD_ACTIVITY)}>
            Add activity
          </Button>
        </div>
        {activities.map(activity => (
          <Activity
            activity={activity}
            key={activity.id}
            refetchActivities={this.handleActivityFetching}
            showAddTaskModal={(activity, task) => this.handleShowModal(MODAL_ADD_TASK, activity, task)}
            showEditActivityModal={activity => this.handleShowModal(MODAL_EDIT_ACTIVITY, activity)}
          />
        ))}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { currentModal, isLoading } = this.state;

    return (
      <div className={classes.activitiesPage}>
        {isLoading ? this.renderLoadingSpinner() : this.renderContent()}
        {currentModal === MODAL_ADD_ACTIVITY && this.renderAddActivityModal()}
        {currentModal === MODAL_EDIT_ACTIVITY && this.renderEditActivityModal()}
        {currentModal === MODAL_ADD_TASK && this.renderAddTaskModal()}
      </div>
    );
  }
}

export default injectSheet(styles)(NewTaskList);
