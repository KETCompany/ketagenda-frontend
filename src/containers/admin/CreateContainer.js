import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import _ from 'lodash';

import * as UserAPI from '../../api/UserAPI';
import * as RoomAPI from '../../api/RoomAPI';
import * as GroupAPI from '../../api/GroupAPI';
import * as EventAPI from '../../api/EventAPI';

import DataForm from '../../components/DataForm';

import {
  RegularCard,
} from '../../components';

const styles = theme => ({

});

class CreateContainer extends Component {
  constructor(props) {
    super(props);
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
              { _id: 'Student', name: 'Student'},
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
            options: [],
            handleSlotSelect: this.handleSlotSelect,
            handleSelectEvent: this.handleSelectEvent
          },
        }
      },
    };
  }

  handleSelectEvent = (e) => alert(e);

  handleSlotSelect = (e) => {
    // this.setState({ booking: { ...this.state.booking, start: moment(this.state.booking.start).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
    // this.setState({ booking: { ...this.state.booking, end: moment(this.state.booking.end).minute(time.getMinutes()).hour(time.getHours()).toDate() } });
    
    // this.setState({
    //   booking: {
    //     ...this.state.booking,
    //     start: moment(this.state.booking.start).date(date.getDate()).month(date.getMonth()).toDate(),
    //     end: moment(this.state.booking.end).date(date.getDate()).month(date.getMonth()).toDate(),
    //   },
    // });
    console.log(e);
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

    const Api = _.get(this.state.api, params.kind);
    const formInputs = _.get(this.state.formInputs, params.kind);

    const a = await Api.initForm();

    const populatedFormInputs = this.populateFormInputs(formInputs, a);
    this.setState({ dataLoaded: true, api: Api, formInputs: populatedFormInputs, kind: params.kind });
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

  saveData = async () => {
    const Api = _.get(this.state, 'api');
    await Api.post(this.state.data)
      .then(res => (res._id ? window.alert('Created successful!') : window.alert('Something went wrong')) )
      .catch(err => console.error(err));
  }

  render() {
    const { data, formInputs, dataLoaded, kind } = this.state;
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
                kind={kind}
              />
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(CreateContainer);