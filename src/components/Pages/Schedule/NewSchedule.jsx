import React, { Component } from 'react';
import injectSheet from 'react-jss';
import LoadingSpinner from '../../../icons/LoadingSpinner';
import axios from 'axios';
import { API_ENDPOINT } from '../../../api';
import ScheduleEntry from './ScheduleEntry';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MODAL_EDIT_SCHEDULE } from '../../../modal';
import ProjektModal from '../../Modals/Modal';

const styles = {
  schedulePage: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1120px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fafafa'
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    width: '100%'
  },
  content: {
    flexDirection: 'column',
    width: '100%',

    '& > div': {
      marginBottom: '20px'
    }
  },
  italicText: {
    color: '#7f868a',
    fontStyle: 'italic'
  }
};

export class NewSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: null,
      currentSchedule: null,
      selectedDate: new Date(),
      isLoading: true,
      schedules: []
    };
  }

  componentDidMount() {
    this.handleScheduleFetching();
  }

  handleShowModal = (modal, schedule) => {
    this.setState({ currentModal: modal, currentSchedule: schedule });
  };

  handleCloseModal = () => {
    this.setState({ currentModal: '' });
    this.handleScheduleFetching();
  };

  handleScheduleFetching = () => {
    const { selectedDate } = this.state;

    const userId = sessionStorage.getItem('userId');
    this.setState({ isLoading: true });

    return axios
      .post(`${API_ENDPOINT}/user/${userId}/schedule`, { date: selectedDate })
      .then(response => {
        console.log(response.data);
        this.setState({ schedules: response.data });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  renderEditScheduleModal() {
    const { currentSchedule } = this.state;

    return (
      <ProjektModal
        modalType={MODAL_EDIT_SCHEDULE}
        currentSchedule={currentSchedule}
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
    const { classes } = this.props;
    const { currentModal, selectedDate, schedules } = this.state;

    return (
      <div className={classes.content}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            format="yyyy/MM/dd"
            value={selectedDate}
            onChange={date => this.setState({ selectedDate: date }, () => this.handleScheduleFetching())}
          />
        </MuiPickersUtilsProvider>
        <h1 style={{ margin: '20px 0' }}>Tasks</h1>
        {schedules.length ? (
          schedules
            .sort((a, b) => new Date(a.timeFrom) - new Date(b.timeFrom))
            .map(schedule => (
              <ScheduleEntry
                showEditScheduleModal={schedule => this.handleShowModal(MODAL_EDIT_SCHEDULE, schedule)}
                schedule={schedule}
                key={schedule.id}
              />
            ))
        ) : (
          <h4 className={classes.italicText}>Woohoo! No tasks for that day</h4>
        )}
        {currentModal === MODAL_EDIT_SCHEDULE && this.renderEditScheduleModal()}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    return <div className={classes.schedulePage}>{isLoading ? this.renderLoadingSpinner() : this.renderContent()}</div>;
  }
}

export default injectSheet(styles)(NewSchedule);
