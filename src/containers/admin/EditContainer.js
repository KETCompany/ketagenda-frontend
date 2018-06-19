import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import _ from 'lodash';

import * as UserAPI from '../../api/UserAPI';
import * as RoomAPI from '../../api/RoomAPI';
import * as GroupAPI from '../../api/GroupAPI';
import * as EventAPI from '../../api/EventAPI';


import Button from '../../components/CustomButtons/Button.jsx';
import DataForm from '../../components/DataForm';

import {
  RegularCard,
} from '../../components';

const styles = theme => ({
  buttonRight: {
    right: 0,
    position: 'absolute', 
  }
});

class EditContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      value: 0,
      data: {},
      dataLoaded: false,
      kind: null,
      api: {
        user: UserAPI,
        room: RoomAPI,
        group: GroupAPI,
        event: EventAPI,
      },
      formInputs: {
        user: {
          name: [],
          short: [],
          email: [],
          role: {
            type: 'select',
            options: [
              { _id: 'Student', name: 'Student' },
              { _id: 'Teacher', name: 'Teacher' },
              { _id: 'Admin', name: 'Admin' },
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
          users: {
            type: 'multiSelect',
            options: [],
          }
        },
        room: {
          name: [],
          floor: [],
          number: [],
          type: [],
          location: [],
        },
        event: {
          name: [],
          description: [],
          owner: {
            type: 'select',
            options: [],
          },
          bookings: {
            type: 'calendar',
          },
        }
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

    const formInputs = _.get(this.state.formInputs, params.kind);

    await Promise.all([
      Api.initForm(),
      Api.get(params.id, true),
    ])
      .then(([formInputData, ApiData]) => {
        const populatedFormInputs = this.populateFormInputs(formInputs, formInputData);
        this.setState({
          data: ApiData,
          dataLoaded: true,
          api: Api,
          formInputs: populatedFormInputs,
          kind: params.kind
        });
      })
      .catch(err => console.error(err));
  }

  populateFormInputs = (formInputs, entry) => {
    Object.entries(entry).forEach(([key, values]) => {
      if (_.isArray(values)) {
        if (formInputs[key]) {
          formInputs[key].options = values;
        } else {
          formInputs[key] = {
            options: values,
            type: 'select',
          }
        }
      } else {
        formInputs[key] = values;
      }
    })

    return formInputs;
  }

  handleBack = () => this.props.history.goBack();

  saveData = async () => {
    const Api = _.get(this.state, 'api');
    await Api.put(this.state.data, this.state.data._id)
      .then(res => (res._id ? window.alert('Edited successful!') : window.alert('Something went wrong')) )
      .catch(err => console.error(err));
  }

  render() {
    const { data, formInputs, dataLoaded, kind } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <RegularCard
          headerColor="red"
          cardTitle={(<div>{kind} <Button onClick={this.handleBack} className={classes.buttonRight}>Back</Button></div>)}
          content={
            <div>
              <DataForm
                dataLoaded={dataLoaded}
                data={data}
                formInputs={formInputs}
                handleChange={this.handleChange}
                handleSave={this.saveData}
                kind={kind}
              />
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(EditContainer);
