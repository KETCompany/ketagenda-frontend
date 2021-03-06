import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';

import { Link } from 'react-router-dom';

import {
  Delete,
  Brush,
  Add,
} from '@material-ui/icons';

import _ from 'lodash';
import { Button } from '@material-ui/core';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class DataTableActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

DataTableActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const DataTableActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  DataTableActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  editTableCel: {
    width: '100px',
  },
  deleteTableCel: {
    width: '100px',
  },
  fab: {
    zIndex: 10000,
    position: 'absolute',
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
  },
  search: {
    width: '100%',
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
  },
});

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: props.rowsPerPage,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  transformColumn = data => {
    if (_.isObject(data)) {
      return { key: data.name, value: s => data.select.split('.').reduce((acc, cur) => acc ? acc[cur] : '', s) }
    } else {
      return { key: data, value: s => s[data] };
    }
  }


  render() {
    const { classes, kind, columns, isEditable, editLink, createLink, isDeletable, handleDelete, filter, handleFilterChange } = this.props;
    let { data } = this.props;
    if (data.length > 0) {
      data = data.filter(data => new RegExp(filter && filter[kind] ? filter[kind] : '', 'i').exec(data.name));
    }
    const newColumns = columns.map(this.transformColumn);
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Link to={createLink}>
          <Button variant="fab" color="secondary" aria-label="add" className={classes.fab}>
            <Add />
          </Button>
        </Link>
        <Paper className={classes.paper} elevation={4}>
          <form>
            <Toolbar>
              <Input
                className={classes.search}
                placeholder={`search ${kind}`}
                value={filter && filter[kind] ? filter[kind] : ''}
                onChange={handleFilterChange(kind)}
            />
            </Toolbar>
          </form>
        </Paper>
        {data.length > 0 ? 
          (<div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {newColumns.map((n) => (
                    <TableCell key={n.key}>{_.capitalize(n.key)}</TableCell>
                  ))}
                  {isEditable === true && (
                    <TableCell>{'Edit'}</TableCell>
                  )}
                  {isDeletable === true && (
                    <TableCell>{'Delete'}</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (
                  <TableRow key={n._id}>
                    {newColumns.map((item, key) => (
                      <TableCell key={key}>{item.value(n)}</TableCell>
                    ))}
                    {isEditable === true && (
                      <TableCell className={classes.editTableCel}>
                        <Link to={`${editLink}${n._id}/`}>
                          <IconButton className={classes.button} aria-label="Edit" color="secondary" data-id={n._id}>
                            <Brush />
                          </IconButton>
                        </Link>
                      </TableCell>
                    )}
                    {isDeletable === true && (
                      <TableCell className={classes.deleteTableCel}>
                        <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          color="primary"
                          data-id={n._id}
                          onClick={() => { if (window.confirm(`Are you sure to delete ${n.name}?`)) handleDelete(kind, n._id) }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                )
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[10, 15, 20]}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={DataTableActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>) :
          (
            <Paper className={classes.root}>
              <div>{'No data found'}</div>
            </Paper>
          )}
      </Paper>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);