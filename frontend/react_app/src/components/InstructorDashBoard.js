import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            console.log(this.props.instructor)
            this._isMounted = true;
            this.props.dispatch(fetchInstructor(this.props.token, this.props.id));
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
            console.log(lessons)
            var appointments = lessons.appointments.map((appointment) => {
                return {
                   "client": appointment.client.first_name,
                   "client_age_category": appointment.client.age_category,
                   "start_time": appointment.start_time 
               }   
            })

            const instructor = { "name": lessons.first_name,
                                "id": lessons.user_id};
                                
            const full_day_schedule = settings.hours.map(_hour => {
                if (appointments[0] && _hour === appointments[0].start_time.substring(0,5)) {
                    var tmp =  {
                        'start_time': _hour,
                        'client': appointments[0].client,
                        "client_age_category": appointments[0].client_age_category
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