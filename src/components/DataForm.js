import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Button from './CustomButtons/Button.jsx';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import TextField from 'material-ui/TextField';

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

class DataForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data, formInputs, handleChange, handleSave, dataLoaded } = this.props;
    if (dataLoaded === true) {
      return (
        <div className={classes.root}>
            {Object.keys(formInputs).map(key => (
              <div>
                <TextField
                  defaultValue={data[key]}
                  id={key}
                  label={_.capitalize(key)}
                  className={classes.textField}
                  margin="normal"
                  onChange={handleChange}
                />
              </div>
            ))}
            <Button size="small" onClick={handleSave} color="secondary">
              Submit
            </Button>
        </div>
      );
    } else {
      return (
        <div>{'No data found'}</div>
      )
    }
  }
}

DataForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataForm);