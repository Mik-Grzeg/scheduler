import React, { Component } from 'react';
import { render } from 'react-dom';
import DataTable from './DataTable';
import axios from 'axios';
import * as settings from '../settings'


export function isValidDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = '/' + yyyy + '/' + mm + '/' + dd + '/';
  console.log(today)
  return today
}

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      loaded: false
    };
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.isAuthenticated) {
      let date = isValidDate();

      let headers = { 'Authorization': `Token ${this.props.token}` };
      let url = settings.API_SERVER + '/api/instructors/'
      let method = 'get';

      let config = { headers, method, url }

      axios(config)
      .then(response => {
        this.setState(() => {
          return {
            instructors: response.data,
            loaded: true
          }
        });
      });
    }
  }

  render() {
    if (this.state.loaded) {
      const hours = ['08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00',
          '17:00', '18:00', '19:00', '20:00']

      const instructors = this.state.instructors.map(function(ins) {
        return { 'name': ins.first_name,
                  'id': ins.user_id,
                  'appointment': ins.appointments};
      });

      const rows = this.state.instructors.map((row) => {
        return row.appointments.map(appointment => {
          return [row.first_name, appointment.client, appointment.start_time]})
      });

      var blank_and_filled_appointments = []

      for (var hour_iter in hours) {
        let tmp_for_an_hour = [];
        for (var ins_iter in instructors) {
          if (instructors[ins_iter].appointment[0]){
            if (instructors[ins_iter].appointment[0].start_time.substring(0,5) === hours[hour_iter]){
              tmp_for_an_hour.push(instructors[ins_iter].appointment.shift());
            }
            else {
              tmp_for_an_hour.push(false);
            }
          }
          else {
            tmp_for_an_hour.push(false);
          }
        }
        blank_and_filled_appointments.push(tmp_for_an_hour)
      }


      return (
        <DataTable headings={instructors} rows={blank_and_filled_appointments} />
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

}

export default Schedule;

const container = document.getElementById('root');
render(<Schedule />, container);
