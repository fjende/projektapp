import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { KEY_CODES } from '../../keyCodes';
import { AddActivityModal } from './AddActivityModal';
import { EditActivityModal } from './EditActivityModal';
import {
  MODAL_ADD_ACTIVITY,
  MODAL_EDIT_ACTIVITY,
  MODAL_ADD_TASK,
  MODAL_EDIT_TASK,
  MODAL_ADD_SCHEDULE,
  MODAL_EDIT_SCHEDULE
} from '../../modal';
import { AddTaskModal } from './AddTaskModal';
import { EditTaskModal } from './EditTaskModal';
import { AddScheduleModal } from './AddScheduleModal';
import { EditScheduleModal } from './EditScheduleModal';

const styles = {
  modalOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    overflow: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '10'
  },
  modalWrapper: {
    position: 'fixed',
    top: '80px',
    padding: '30px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px 0 rgba(1, 55, 79, 0.5)'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '32px',
    '& button:not(:last-child)': {
      marginRight: '16px'
    }
  },
  closeIcon: {
    display: 'flex',
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    '& > div': {
      marginBottom: '20px'
    }
  }
};

export class ProjektModal extends Component {
  constructor(props) {
    super(props);

    this.handleOnEscPress = this.handleOnEscPress.bind(this);
    this.handleOnOverlayClick = this.handleOnOverlayClick.bind(this);
    this.handleOnDialogClick = this.handleOnDialogClick.bind(this);

    this.modalRoot = document.getElementById('modal-root');
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleOnEscPress, true);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'visible';
    window.removeEventListener('keydown', this.handleOnEscPress, true);
  }

  handleOnEscPress(event) {
    if (event.keyCode === KEY_CODES.ESCAPE) {
      this.props.hideModal();
    }
  }

  handleOnOverlayClick() {
    this.props.hideModal();
  }

  handleOnDialogClick(event) {
    event.stopPropagation();
  }

  renderModal() {
    switch (this.props.modalType) {
      case MODAL_ADD_ACTIVITY:
        return <AddActivityModal {...this.props} />;
      case MODAL_EDIT_ACTIVITY:
        return <EditActivityModal {...this.props} />;
      case MODAL_ADD_TASK:
        return <AddTaskModal {...this.props} />;
      case MODAL_EDIT_TASK:
        return <EditTaskModal {...this.props} />;
      case MODAL_ADD_SCHEDULE:
        return <AddScheduleModal {...this.props} />;
      case MODAL_EDIT_SCHEDULE:
        return <EditScheduleModal {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    const { classes } = this.props;

    const modalUI = (
      <div className={classes.modalOverlay} onMouseDown={this.handleOnOverlayClick}>
        <div className={classes.modalWrapper} onMouseDown={this.handleOnDialogClick}>
          {this.renderModal()}
        </div>
      </div>
    );
    return ReactDOM.createPortal(modalUI, this.modalRoot);
  }
}

export default injectSheet(styles)(ProjektModal);
