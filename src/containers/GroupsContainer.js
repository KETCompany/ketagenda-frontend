import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DataList from '../components/DataList';
import GroupAPI from '../api/GroupAPI';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class GroupsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      noData: false,
      filter: '',
    };

    this.loadData(GroupAPI);
  }

  loadData = async (api) => {
    const Data = await api.list('', [], true)
    
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

    return (
      <div className={classes.root}>

        <Typography variant="display1" gutterBottom>
          Groups
        </Typography>
        <DataList
          data={data}
          loading={loading}
          filter={filter}
          noData={noData}
          kind={'group'}
          handleFilterChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(GroupsContainer);
