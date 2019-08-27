import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterChips from 'components/FilterChips';
import { connect } from 'react-redux';
import { toggleDrawer } from 'actions/navigation';
import { removeAllFilters } from 'actions/search';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(.5),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  filters: {
    flex: '0 0 auto',
  },
  filterButton: {
    marginRight: theme.spacing(2),
  },
}));

export default connect(
  null,
  dispatch => ({
    handleDrawerToggle: () => {
      dispatch(toggleDrawer());
    },
    removeAllFilters: () => {
      dispatch(removeAllFilters());
    },
  })
)(({ handleDrawerToggle, removeAllFilters }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRemoveAllClick() {
    setAnchorEl(null);
    removeAllFilters();
  }

  return (
    <Toolbar className={classes.root}>
      <div className={classes.actions}>
        <Tooltip title="Filter results">
          <IconButton
            aria-label="filter list"
            className={classes.filterButton}
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.filters}>
        <FilterChips />
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter menu">
          <IconButton
            aria-label="more"
            aria-controls="filter-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleRemoveAllClick}>
            {'Clear all filters'}
          </MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
});