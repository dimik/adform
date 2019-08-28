import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableToolbar from 'components/TableToolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { searchCampaigns } from 'actions/campaigns';
import datesUtil from 'util/dates';
import numbersUtil from 'util/numbers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  statusIcon: {
    fontSize: '0.875rem',
    verticalAlign: 'middle',
    marginRight: theme.spacing(.5),
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
}));

export function Campaigns({ campaigns, searchText, searchFilters, searchCampaigns }) {
  const classes = useStyles();
  const [query, setQuery] = useState(campaigns.query);

  useEffect(() => {
    searchCampaigns(query);
  }, [query, searchCampaigns]);

  useEffect(() => {
    const filters = searchFilters
      .filter(filter => filter.type === 'campaigns' && filter.active)
      .reduce((filters, filter) => ({ ...filters, ...filter.query }), {});

    setQuery(({ limit }) => ({ name: searchText, offset: 0, limit, ...filters }));
    window.scrollTo(0, 0);
  }, [searchText, searchFilters, campaigns.isPopulating]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar />
        <Divider />
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{'Name'}</TableCell>
                <TableCell>{'Status'}</TableCell>
                <TableCell align="right">{'Start date'}</TableCell>
                <TableCell align="right">{'End date'}</TableCell>
                <TableCell align="right">{'Budget'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.items.map(campaign => (
                <TableRow
                  tabIndex={-1}
                  key={campaign.id}
                >
                  <TableCell component="th" scope="row">
                    {campaign.name}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap variant="inherit">
                      {datesUtil.isWithinInterval(Date.now(), campaign) ? (
                        <><CheckCircleIcon className={clsx(classes.statusIcon, classes.active)} />{'Active'}</>
                      ) : (
                          <><CancelIcon className={clsx(classes.statusIcon, classes.inactive)} />{'Inactive'}</>
                        )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{datesUtil.formatDateString(campaign.startDate)}</TableCell>
                  <TableCell align="right">{datesUtil.formatDateString(campaign.endDate)}</TableCell>
                  <TableCell align="right">{numbersUtil.formatCurrency(campaign.budget)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={campaigns.total || 0}
          rowsPerPage={campaigns.query.limit}
          page={Math.floor(campaigns.query.offset / campaigns.query.limit)}
          backIconButtonProps={{ 'aria-label': 'previous page' }}
          nextIconButtonProps={{ 'aria-label': 'next page' }}
          onChangePage={(e, newPage) => {
            setQuery(query => ({ ...query, offset: campaigns.query.limit * newPage }));
          }}
          onChangeRowsPerPage={e => {
            setQuery(query => ({ ...query, limit: Number(e.target.value), offset: 0 }));
          }}
        />
      </Paper>
    </div>
  );
};

export default connect(
  ({ campaigns, search }) => ({
    campaigns,
    searchText: search.text,
    searchFilters: search.filters,
  }),
  { searchCampaigns },
)(Campaigns);