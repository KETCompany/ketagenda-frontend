import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import _ from 'lodash';

import * as UserAPI from '../../api/UserAPI';
import * as RoomAPI from '../../api/RoomAPI';
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
      api: {
        user: UserAPI,
        room: RoomAPI,
      },
      formInputs: {
        user: {
          name: [],
          short: [],
          email: [],
          role: {
            type: 'select',
            options: [
              'student',
              'teacher',
              'admin',
            ],
          },
        },
        room: {
          name: [],
          floor: [],
          number: [],
          type: [],
        },
      },
    };
    this.loadData(props.match.params);
  }

  handleChange = (e) => {
    this.setState({ data: { ...this.state.data, [e.target.id]: e.target.value } });
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
    const APIData = await Api.get(params.id)
      .catch(err => console.error(err));

    this.setState({ data: APIData, api: Api, formInputs: _.get(this.state.formInputs, params.kind) });
  }

  saveData = async () => {
    const Api = _.get(this.state, 'api');
    await Api.put(this.state.data, this.state.data._id)
      .catch(err => console.error(err));
  }

  render() {
    const { data, formInputs } = this.state;
    return (
      <div>
        <RegularCard
          content={
            <div>
              <DataForm
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
