import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux';
import { setFilter } from 'actions/search';
import { closeDrawer } from 'actions/navigation';
import datesUtil from 'util/dates';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
  },
  paper: {
    width: ({ drawerWidth }) => drawerWidth,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    cursor: 'pointer',
    ...theme.mixins.toolbar,
  },
  closeButton: {
    marginRight: theme.spacing(1.5),
  },
  filters: {
    padding: theme.spacing(3, 2, 0, 2),
  },
  pickers: {
    display: 'flex',
  },
}));

export function AppDrawer({ drawer, handleDrawerClose, handleStartDateChange, handleEndDateChange, startDate, endDate }) {
  const classes = useStyles({ drawerWidth: drawer.width });

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      anchor="right"
      open={drawer.open}
      classes={{ paper: classes.paper }}
    >
      <div
        className={classes.header}
        onClick={handleDrawerClose}
      >
        <IconButton
          className={classes.closeButton}
          onClick={handleDrawerClose}
        >
          <ChevronRightIcon />
        </IconButton>
        <Typography>{'Filter results'}</Typography>
      </div>
      <div className={classes.filters}>
        <Typography>{'Filter by Period'}</Typography>
        <Grid container direction="row" spacing={1}>
          <Grid item xs>
            <DatePicker
              margin="normal"
              id="date-picker-start-date"
              label="Start"
              format="MM/dd/yyyy"
              fullWidth
              value={startDate ? new Date(startDate.value) : null}
              maxDate={endDate && new Date(endDate.value)}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs>
            <DatePicker
              margin="normal"
              id="date-picker-end-date"
              label="End"
              format="MM/dd/yyyy"
              fullWidth
              value={endDate ? new Date(endDate.value) : null}
              minDate={startDate && new Date(startDate.value)}
              onChange={handleEndDateChange}
            />
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

export default connect(
  ({ navigation, search }) => ({
    drawer: navigation.drawer,
    searchFilters: search.filters,
    startDate: search.filters.find(filter => filter.name === 'startDate'),
    endDate: search.filters.find(filter => filter.name === 'endDate'),
  }),
  dispatch => ({
    handleDrawerClose: () => {
      dispatch(closeDrawer());
    },
    handleStartDateChange: date => {
      dispatch(setFilter({
        active: true,
        name: 'startDate',
        type: 'campaigns',
        value: date.toISOString(),
        query: { startDate: date.toISOString() },
        label: `Active since ${datesUtil.formatDateLocalized(date)}`,
      }));
    },
    handleEndDateChange: date => {
      dispatch(setFilter({
        active: true,
        name: 'endDate',
        type: 'campaigns',
        value: date.toISOString(),
        query: { endDate: date.toISOString() },
        label: `Active until ${datesUtil.formatDateLocalized(date)}`,
      }));
    },
  })
)(AppDrawer);