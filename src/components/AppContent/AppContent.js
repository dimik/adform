import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  rootShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: ({ drawerWidth }) => drawerWidth,
  },
  spacer: {
    ...theme.mixins.toolbar,
  },
}));

export default connect(
  ({ navigation }) => ({
    drawerOpen: navigation.drawer.open,
    drawerWidth: navigation.drawer.width,
  })
)(({ children, drawerOpen, drawerWidth }) => {
  const classes = useStyles({ drawerWidth });

  return (
    <main
      className={clsx(classes.root, {
        [classes.rootShift]: drawerOpen,
      })}
    >
      <div className={classes.spacer} />
      {children}
    </main>
  );
});