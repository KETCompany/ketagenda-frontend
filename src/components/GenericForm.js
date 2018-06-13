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

import {
  Delete,
  Brush
} from '@material-ui/icons';

import withRoot from '../withRoot';
import _ from 'lodash';

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
    width: '100px'
  },
  deleteTableCel: {
    width: '100px'
  }
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

  render() {
    const { classes, data, columns, isEditable, handleEdit, isDeletable, handleDelete } = this.props;
    
    if (data.length > 0) {
      const { rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      return (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {columns.map((n) => (
                    <TableCell>{_.capitalize(n)}</TableCell>
                  ))}
                  {isEditable == true && (
                    <TableCell>{'Edit'}</TableCell>
                  )}
                  {isDeletable == true && (
                    <TableCell>{'Delete'}</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => (
                    <TableRow key={n._id}>
                    {columns.map((item) => (
                      <TableCell>{n[item]}</TableCell>
                    ))}
                    {isEditable == true && (
                      <TableCell className={classes.editTableCel}>
                        <IconButton className={classes.button} aria-label="Edit" color="secondary" data-id={n._id} onClick={handleEdit}>
                          <Brush />
                        </IconButton>
                      </TableCell>
                    )}
                    {isDeletable == true && (
                      <TableCell className={classes.deleteTableCel}>
                        <IconButton className={classes.button} aria-label="Delete" color="primary" data-id={n._id} onClick={handleDelete}>
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
          </div>
        </Paper>
      );
    } else {
      return (
        <div>{'No data found'}</div>
      )
    }
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);