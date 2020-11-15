import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { isValidDate } from './Schedule';
import * as settings from '../settings';
import InstructorTable from './InstructorTable';

import { fetchInstructor } from '../instructorStore/instructorActions'

class InstructorDashBoard extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            loaded: false
        }
    }

    componentDidMount() {
        if (this.props.instructor && this.props.isAuthenticated){
            this._isMounted = true;
            this.props.dispatch(fetchInstructor(this.props.token, this.props.instructor));

        }
    }

    componentWillUnmount() {
       this._isMounted = false;
    }

    render() {
        const { error, loading, lessons } = this.props
        console.log(lessons);
        if (error) {
          return <div>Error! {error.message}</div>
        }
    
        if (loading) {
          return <div>Loading...</div>
        }
        if (this._isMounted) {
            var appointments = lessons.appointments.map((appointment) => {
                return {    "start_time": appointment.start_time,
                            "client": appointment.client                
                }
            })
            const instructor = { "name": 'Mikolaj',
                                "id": '4'};

            const full_day_schedule = settings.hours.map(_hour => {
                if (appointments[0] && _hour === appointments[0].start_time.substring(0,5)) {
                    var tmp =  {
                        'start_time': _hour,
                        'client': appointments[0].client
                    }
                    appointments.shift();
                    return tmp;
                }
                else {
                    return {
                        'start_time': _hour,
                        'client': ''
                    }
                }
            })
            console.log(full_day_schedule);

            return (
                <InstructorTable instructor={instructor} appointments={full_day_schedule} />
            );
        } else {
            return(
                <div>Loading...</div>
            )
        }
    }
}


const mapStateToProps = state => ({
    lessons: state.instructor.instructor,
    loading: state.instructor.loading,
    error: state.instructor.error
  })
  
export default connect(mapStateToProps)(InstructorDashBoard);