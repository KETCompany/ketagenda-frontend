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
          groups: {
            type: 'multiSelect',
            options: [],
          }
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
    if (!_.has(params, 'kind')) {
      console.error('No kind of form!');
      return;
    }
    console.log(params.kind);
    const Api = _.get(this.state.api, params.kind);
    const formInputs = _.get(this.state.formInputs, params.kind);

    const a = await Api.initCreate();

    const populatedFormInputs = this.populateFormInputs(formInputs, a);
    this.setState({ dataLoaded: true, api: Api, formInputs: populatedFormInputs  });
  }

  populateFormInputs = (formInputs, entry) => {
    Object.entries(entry).forEach(([key, values]) => {
      if (_.isArray(values)) {
        formInputs[key].options = values;
      } else {
        formInputs[key] = values;
      }
    })

    return formInputs;
  }

  saveData = async () => {
    const Api = _.get(this.state, 'api');
    await Api.post(this.state.data)
      .then(res => (res._id ? window.alert('Created successful!') : window.alert('Something went wrong')) )
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