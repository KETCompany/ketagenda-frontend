import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


import withRoot from '../withRoot';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('nl');

const styles = theme => ({});

class ReservationsCalendar extends React.Component {
  render = () => {
    const {
      agendaItems,
      handleSlotSelect,
      handleSelectEvent
    } = this.props;
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

    return (
      <div>
          <BigCalendar
            selectable={true}
            events={agendaItems}
            step={12}
            timeslots={10}
            defaultView="week"
            defaultDate={new Date()}
            toolbar={true}
            onSelectEvent={handleSlotSelect}
            onSelectSlot={handleSelectEvent}
          />
      </div>
    );
  }
}
ReservationsCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ReservationsCalendar));
  