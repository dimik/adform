import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux';
import { removeFilter, toggleFilter } from 'actions/search';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  chip: {
    marginRight: theme.spacing(1),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

export function FilterChips({ search, handleRemoveFilter, handleToggleFilter }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {search.filters.map(filter => (
        <Chip
          className={classes.chip}
          key={filter.name}
          icon={filter.active ? (<DoneIcon />) : null}
          label={filter.label}
          onClick={() => {
            handleToggleFilter(filter.name);
          }}
          onDelete={() => {
            handleRemoveFilter(filter.name);
          }}
        />
      ))}
    </div>
  );
};

export default connect(
  ({ search }) => ({ search }),
  dispatch => ({
    handleRemoveFilter: name => {
      dispatch(removeFilter(name));
    },
    handleToggleFilter: name => {
      dispatch(toggleFilter(name));
    },
  })
)(FilterChips);