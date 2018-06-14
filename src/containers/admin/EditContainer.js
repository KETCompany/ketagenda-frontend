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
      apiClasses: {
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  loadData = async (params) => {
    if (!_.has(params, 'kind')) {
      console.error('no kind');
      return;
    }
    const API = _.get(this.state.apiClasses, params.kind);
    const APIData = await API.get(params.id)
      .catch(err => console.error(err));

    this.setState({ data: APIData, formInputs: _.get(this.state.formInputs, params.kind) });
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
              />
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(UsersContainer);
