import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('nl');

const styles = theme => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    margin: '0 auto',
  }
});

const formats = {
  timeGutterFormat: (time, culture, localizer) =>
    localizer.format(time, 'H:mm', culture),

  selectRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, 'H:mm', culture)} - ${localizer.format(end, 'H:mm', culture)}`,

  agendaTimeFormat: (time, culture, localizer) =>
    localizer.format(time, 'H:mm', culture),

  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, 'H:mm', culture)} - ${localizer.format(end, 'H:mm', culture)}`,

  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, 'H:mm', culture)} - ${localizer.format(end, 'H:mm', culture)}`,
};

class ReservationsCalendar extends React.Component {
  render = () => {
    const {
      agendaItems,
      handleSlotSelect,
      handleSelectEvent,
      classes
    } = this.props;

    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

    return (
      <Paper className={classes.paper} elevation={4}>
        <BigCalendar
          selectable={true}
          events={agendaItems}
          step={30}
          formats={formats}
          min={new Date('01/01/1970 8:00')}
          max={new Date('01/01/1970 22:00')}
          defaultView="week"
          defaultDate={new Date()}
          toolbar={true}
          onSelectEvent={handleSlotSelect}
          onSelectSlot={handleSelectEvent}
        />
      </Paper>
    );
  }
}
ReservationsCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ReservationsCalendar));
  