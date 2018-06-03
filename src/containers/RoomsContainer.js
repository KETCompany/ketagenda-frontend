import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import _ from 'lodash';

import RoomSearch from '../components/RoomSearch';
import RoomFilters from '../components/RoomFilters';

import RoomList from '../components/RoomList';

import * as RoomAPI from '../api/RoomAPI';
import QrDialogSlide from '../components/QrDialogSlide';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 15,
  },
});

class RoomsContainer extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      rooms: [],
      noRooms: false,
      selectedTime: '',
      selectedDate: '',
      filters: {
        locations: [],
        floors: [],
        types: [],
      },
      filtersDisabled: {
        locations: [],
        floors: [],
        types: [],
      },
      type: '',
      qrDialogOpen: false,
      qrCodeValue: '',
    };

    this.getRoomFilters();
    this.onSearch();
  }

  getRoomFilters = () => {
    RoomAPI.filters('')
      .then((filters) => {
        this.setState({
          filters,
          filtersDisabled: filters,
        });
      });
  }

  onSearchChange = (e) => {
    const { value } = e.target;

    this.setState({
      search: value,
    });
  }

  onSubmitSearch = async (e) => {
    e.preventDefault();
    this.setState({ expanded: [] });
    this.onSearch();
  }

  handleChange = type => name => (event) => {
    const clicked = event.target.checked ? true : false
    const { filters } = this.state;

    this.setState({
      filters: {
        ...filters,
        [type]: {
          ...filters[type],
          [name]: event.target.checked,
        },
      },
    }, () => {
      this.onSearch(true);
    });
  };

  handleChangeSingle = name => (value) => {
    this.setState({
      [name]: value,
    }, () => {
      console.log(this.state);
      // this.onSearch(true);
    });
  };

  handleDateChange = (date) => {
    const { selectedTime } = this.state;
    this.setState({ selectedDate: date, selectedTime: selectedTime === '' ? new Date() : selectedTime });
  }
  handleTimeChange = (time) => {
    const { selectedDate } = this.state;
    this.setState({ selectedTime: time, selectedDate: selectedDate === '' ? time : selectedDate });
  }

  clearFilters = async () => {
    const { filters } = this.state;
    const newFilters = _.mapValues(filters, filter => _.mapValues(filter, () => false));
    const filtersDisabled = await RoomAPI.filters('');
    this.setState({ filters: newFilters, filtersDisabled, type: '' });
  }

  dateNow = () => {
    this.setState({ selectedDate: new Date(), selectedTime: new Date() }, () => {
      this.onSearch();
    });
  }

  onSearch = async (filtered) => {
    const {
      search,
      filters,
      type,
      selectedTime,
    } = this.state;
    let { selectedDate } = this.state;

    let filtering = false;

    const searchQueryArray = [`name=${search}`];

    if (type !== '' && type !== null) {
      searchQueryArray.push(`type=${this.state.type}`);
    }

    if (selectedTime) {
      if (!selectedTime) {
        selectedDate = new Date();
      }
      selectedDate.setHours(selectedTime.getHours());
      selectedDate.setMinutes(selectedTime.getMinutes());
      const time = Math.floor(selectedDate.getTime() / 1000);
      searchQueryArray.push(`time=${time}`);
    }

    if (Object.keys(filters.locations).length > 0) {
      searchQueryArray.push(Object.keys(filters.locations).reduce((acc, curr) => {
        if (filters.locations[curr]) {
          filtering = true;
          if (!acc) acc += `location=${curr}`;
          else acc += `,${curr}`
        }
        return acc;
      }, ''))
    }

    if (Object.keys(filters.floors).length > 0) {
      searchQueryArray.push(Object.keys(filters.floors).reduce((acc, curr) => {
        if (filters.floors[curr]) {
          filtering = true;
          if (!acc) acc += `floor=${curr}`;
          else acc += `,${curr}`
        }
        return acc;
      }, ''))
    }

    if (filtering || !filtered || (this.state.type !== '' && this.state.type !== null)) {
      const searchQuery = searchQueryArray.reduce((acc, curr) => {
        if (!acc) acc += `${curr}`
        else if (curr) acc += `&${curr}`

        return acc;
      }, '');

      const rooms = await RoomAPI.list(`?${searchQuery}`);
      const filtersDisabled = await RoomAPI.filters(`&${searchQuery.replace('&floor', '&floors')}`);
      this.setState({
        ...this.state, rooms: rooms || [], filtersDisabled, noRooms: rooms.length === 0, loading: false,
        expanded: filtered ? this.state.expanded : []
      });
    } else {
      this.setState({ ...this.state, rooms: [], filtersDisabled: this.state.filters, loading: false });
    }
  }

  handleQRClickOpen = id => () => {
    this.setState({ qrDialogOpen: true, qrCodeValue: id });
  };

  onQRClickClose = () => {
    this.setState({ qrDialogOpen: false, qrCodeValue: '' });
  };


  render() {
    const { classes } = this.props;
    const {
      search, filters, filtersDisabled, rooms, noRooms, loading,
      type, selectedDate, selectedTime, qrDialogOpen, qrCodeValue,
    } = this.state;

    return (
      <div className={classes.root}>

        <Typography variant="display1" gutterBottom>
          KET-Agenda
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Key for electronic technolgies in agenda's
        </Typography>


        <RoomSearch
          onSubmitSearch={this.onSubmitSearch}
          search={search}
          onSearchChange={this.onSearchChange}
        />

        <RoomFilters
          filters={filters}
          filtersDisabled={filtersDisabled}
          handleChange={this.handleChange}
          handleChangeSingle={this.handleChangeSingle}
          handleDateChange={this.handleDateChange}
          handleTimeChange={this.handleTimeChange}
          dateNow={this.dateNow}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          clearFilters={this.clearFilters}
          onSearch={this.onSearch}
          type={type}
           />
        <RoomList
          rooms={rooms}
          loading={loading}
          noRooms={noRooms}
          onQRClickOpen={this.handleQRClickOpen} />

        <QrDialogSlide
          open={qrDialogOpen}
          value={qrCodeValue}
          handleQRClickClose={this.onQRClickClose}
         />
      </div>
    );
  }
}

export default withStyles(styles)(RoomsContainer);
