import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from 'components/AppToolbar';
import AppDrawer from 'components/AppDrawer';
import AppContent from 'components/AppContent';
import ModalPreloader from 'components/ModalPreloader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

export default ({ children }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <CssBaseline />
        <AppToolbar />
        <AppDrawer />
        <AppContent>{children}</AppContent>
        <ModalPreloader />
      </div>
    </MuiPickersUtilsProvider>
  );
};