import React, { Component } from 'react';
import { render } from 'react-dom';
import DataTable from './DataTable';
import axios from 'axios';
import * as settings from '../settings'
import { connect } from 'react-redux';
import { fetchAppointments } from '../appointmentsStore/appointmentActions';


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
  /*constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      loaded: false
    };
  }*/

  componentDidMount() {
    if (this.props.isAuthenticated) {
      let date = isValidDate();

      this.props.dispatch(fetchAppointments(this.props.token, this.props.instructor));
    }
  }

  render() {
  
    const { error, loading, lessons } = this.props
    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }
    const hours = ['08:00', '09:00', '10:00', '11:00',
                  '12:00', '13:00', '14:00', '15:00', '16:00',
                  '17:00', '18:00', '19:00', '20:00']

    const instructors = lessons.map(function(ins) {
      return { 'name': ins.first_name,
                'id': ins.user_id,
                'appointment': ins.appointments};
    });

    const rows = lessons.map((row) => {
      return row.appointments.map(appointment => {
        console.log(appointment)
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
  }

}

const mapStateToProps = state => ({
  lessons: state.appointments.appointments,
  loading: state.appointments.loading,
  error: state.appointments.error
})

export default connect(mapStateToProps)(Schedule);
