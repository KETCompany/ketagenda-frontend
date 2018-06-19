import React, { Component } from 'react';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import Button from 'material-ui/Button';

import SwitchFilters from './SwitchFilters';
import TextFilter from './TextFilter';


const styles = theme => ({
  expansionPanelRoot: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  paperNoMargin: {
    paddingTop: 16,
    paddingBottom: 16,
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});


class RoomFilters extends Component {
  constructor() {
    super();
    this.state = {
      expanded: [],
    };
  }

  handleExpansionChange = panel => (event, expanded) => {
    this.setState({
      expanded: [expanded ? panel : false],
    });
  };

  render() {
    const {
      classes,
      filters,
      filtersDisabled,
      type,
      handleChange,
      handleChangeSingle,
      handleDateChange,
      handleTimeChange,
      clearFilters,
      onSearch,
      dateNow,
      selectedDate, 
      selectedTime
    } = this.props;

    const { expanded } = this.state;

    return (
      <div className={classes.expansionPanelRoot}>
        <ExpansionPanel expanded={expanded.indexOf('panel1') >= 0} onChange={this.handleExpansionChange('panel1')} className={classes.paperNoMargin}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}></Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select a date</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <DatePicker
                keyboard
                format="DD/MM/YYYY"
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                placeholder="11/11/2018"
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
                invalidDateMessage={'Select a date'}
              />
            </div>
            <div className={classes.column}>
              <Button size="small" color="primary" onClick={dateNow}>Now</Button>
            </div>
            <div className={classes.column}>
              <TimePicker
                keyboard
                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                ampm={false}
                value={selectedTime}
                onChange={handleTimeChange}
                placeholder="13:37"
                invalidDateMessage={'Select a time'}
              />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" onClick={onSearch} color="primary">
              Search
          </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded.indexOf('panel2') >= 0} onChange={this.handleExpansionChange('panel2')} className={classes.paperNoMargin}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}></Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select more filters</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <SwitchFilters
                handleChange={handleChange('locations')}
                filters={filters ? filters.locations : []}
                text={'Locations:'}
              />
            </div>
            <div className={classes.column}>
              <SwitchFilters
                handleChange={handleChange('floors')}
                filters={filters ? filters.floors : []}
                filtersDisabled={filtersDisabled ? filtersDisabled.floors : []}
                text={'Floors:'}
              />
            </div>
            <div className={classes.column}>
              <TextFilter
                filters={filtersDisabled ? filtersDisabled.types : []}
                value={type}
                handleChange={handleChangeSingle('type')} />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" onClick={clearFilters}>Cancel</Button>
            <Button size="small" onClick={onSearch} color="primary">
              Search
          </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(RoomFilters);
