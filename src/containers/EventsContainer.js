import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DataList from '../components/DataList';
import EventAPI from '../api/EventAPI';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class EventsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      noData: false,
      filter: '',
    };

    this.loadData(EventAPI);
  }

  loadData = async (api) => {
    const Data = await api.list('')
    
    if (Data) {
      this.setState({ data: Data });
    }
  }
  
  handleFilterChange = (e) => {
    const { value } = e.target;

    this.setState({
      filter: value
    });
  }

  render() {
    const { classes } = this.props;
    const { data, noData, loading, filter } = this.state;
    console.log(data);
    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          Events
        </Typography>
        <DataList
          data={data}
          loading={loading}
          filter={filter}
          noData={noData}
          kind={'event'}
          handleFilterChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EventsContainer);
