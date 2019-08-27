import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchText from 'components/SearchText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  rootShift: ({ drawerWidth }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default connect(
  ({ navigation, search }) => ({
    drawer: navigation.drawer,
    toolbar: navigation.toolbar,
    search,
  })
)(({ drawer, toolbar, search }) => {
  const classes = useStyles({ drawerWidth: drawer.width });

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.root, {
        [classes.rootShift]: drawer.open,
      })}
    >
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          {toolbar.title}
        </Typography>
        <SearchText />
      </Toolbar>
      {search.inProgress && (
        <LinearProgress />
      )}
    </AppBar>
  );
});