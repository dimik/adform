import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

export function ModalPreloader({ isPopulating }) {
  return (
    <Dialog
      open={isPopulating}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Populating database...'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component="div">
          <LinearProgress />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  ({ storage }) => ({
    isPopulating: storage.isPopulating,
  })
)(ModalPreloader);