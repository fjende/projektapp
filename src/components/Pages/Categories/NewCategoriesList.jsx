import React, { Component } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import LoadingSpinner from '../../../icons/LoadingSpinner';
import { Button } from '@material-ui/core';
import {
  MODAL_ADD_ACTIVITY,
  MODAL_EDIT_ACTIVITY,
  MODAL_ADD_TASK,
  MODAL_EDIT_TASK,
  MODAL_ADD_SCHEDULE,
  MODAL_EDIT_CATEGORY,
  MODAL_ADD_CATEGORY
} from '../../../modal';
import ProjektModal from '../../Modals/Modal';
import { Divider } from '@material-ui/core/';
import Category from './Category';

const styles = {
  activitiesPage: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1120px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'primary'
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
  },
  buttonStyle: {
    width: '300px'
  }
};

export class NewCategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      schedules: [],
      colors: [],
      types: [],
      statuses: [],
      currentModal: null,
      currentActivity: null,
      currentTask: null,
      currentCategory: null
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
      .get(`${API_ENDPOINT}/activity-type-daily-schedule/user/${userId}/`)
      .then(response => this.setState({ schedules: response.data }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleShowModal = (modal, category, task, schedule) => {
    this.setState({ currentModal: modal, currentCategory: category, currentTask: task, currentSchedule: schedule });
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

  renderAddCategoryModal() {
    const { colors, statuses, types } = this.state;
    return (
      <ProjektModal
        modalType={MODAL_ADD_CATEGORY}
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

  renderEditCategoryModal() {
    const { currentCategory } = this.state;
    return (
      <ProjektModal
        modalType={MODAL_EDIT_CATEGORY}
        currentCategory={currentCategory}
        hideModal={this.handleCloseModal}
      />
    );
  }

  renderAddScheduleModal() {
    const { currentActivity, currentTask } = this.state;

    return (
      <ProjektModal
        modalType={MODAL_ADD_SCHEDULE}
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
    const { schedules } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div style={{ textAlign: 'center', marginBottom: '15px', marginTop: '5px' }}>
          <Button
            variant="outlined"
            className={classes.buttonStyle}
            color="primary"
            onClick={() => this.handleShowModal(MODAL_ADD_CATEGORY)}
          >
            Add New Category
          </Button>
        </div>
        {schedules.map(category => (
          <Category
            category={category}
            key={category.id}
            refetchActivities={this.handleActivityFetching}
            showAddTaskModal={(activity, task) => this.handleShowModal(MODAL_ADD_TASK, activity, task)}
            showEditCategoryModal={category => this.handleShowModal(MODAL_EDIT_CATEGORY, category)}
            showEditActivityModal={activity => this.handleShowModal(MODAL_EDIT_ACTIVITY, activity)}
            showAddScheduleModal={(activity, task) => this.handleShowModal(MODAL_ADD_SCHEDULE, activity, task)}
            showEditScheduleModal={(activity, task, schedule) =>
              this.handleShowModal(MODAL_ADD_SCHEDULE, activity, task, schedule)
            }
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
        {currentModal === MODAL_ADD_CATEGORY && this.renderAddCategoryModal()}
        {currentModal === MODAL_ADD_ACTIVITY && this.renderAddActivityModal()}
        {currentModal === MODAL_EDIT_ACTIVITY && this.renderEditActivityModal()}
        {currentModal === MODAL_ADD_TASK && this.renderAddTaskModal()}
        {currentModal === MODAL_EDIT_CATEGORY && this.renderEditCategoryModal()}
        {currentModal === MODAL_ADD_SCHEDULE && this.renderAddScheduleModal()}
      </div>
    );
  }
}

export default injectSheet(styles)(NewCategoriesList);
