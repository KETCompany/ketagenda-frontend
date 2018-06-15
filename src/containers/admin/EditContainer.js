import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import _ from 'lodash';

import * as UserAPI from '../../api/UserAPI';
import * as RoomAPI from '../../api/RoomAPI';
import * as GroupAPI from '../../api/GroupAPI';

import DataForm from '../../components/DataForm';

import {
  RegularCard,
} from '../../components';

const styles = theme => ({

});

class UsersContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      value: 0,
      data: {},
      dataLoaded: false,
      api: {
        user: UserAPI,
        room: RoomAPI,
        group: GroupAPI,
      },
      formInputs: {
        user: {
          name: [],
          short: [],
          email: [],
          role: {
            type: 'select',
            options: [
              'Student',
              'Teacher',
              'Admin',
            ],
          },
        },
        group: {
          name: [],
          description: [],
        },
        room: {
          name: [],
          floor: [],
          number: [],
          type: [],
        },
      },
    };
  }

  componentDidMount = () => {
    this.loadData(this.props.match.params);
  }

  handleChange = (e) => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  }

  loadData = async (params) => {
    if (!_.isEmpty(this.state.data)) {
      console.log('Data is allready loaded!');
      return;
    }

    if (!_.has(params, 'kind')) {
      console.error('No kind of form!');
      return;
    }
    
    const Api = _.get(this.state.api, params.kind);
    await Api.get(params.id, true)
      .then(ApiData => this.setState({
        data: ApiData, dataLoaded: true, api: Api, formInputs: _.get(this.state.formInputs, params.kind) 
      }))
      .catch(err => console.error(err));
  }

  saveData = async () => {
    const Api = _.get(this.state, 'api');
    await Api.put(this.state.data, this.state.data._id)
      .then(res => (res._id ? window.alert('Edited successful!') : window.alert('Something went wrong')) )
      .catch(err => console.error(err));
  }

  render() {
    const { data, formInputs, dataLoaded } = this.state;
    return (
      <div>
        <RegularCard
          content={
            <div>
              <DataForm
                dataLoaded={dataLoaded}
                data={data}
                formInputs={formInputs}
                handleChange={this.handleChange}
                handleSave={this.saveData}
              />
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(UsersContainer);
