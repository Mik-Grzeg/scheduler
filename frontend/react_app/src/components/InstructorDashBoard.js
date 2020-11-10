import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { isValidDate } from './Schedule';
import * as settings from '../settings';
import InstructorTable from './InstructorTable';

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

            let headers = { 'Authorization': `Token ${this.props.token}` };
            console.log(headers)
            let pk = '4';
            let url = settings.API_SERVER + '/api/instructor=' + pk + isValidDate();
            let method = 'get';
            let config = { headers, method, url}
            // pk, isValidDate should be rewritten
            
            axios(config)
            .then(response => {
                this.setState(() => {
                    return {
                        appointments: response.data,
                        loaded: true
                    }
                })
            })
        }
    }

    componentWillUnmount() {
       this._isMounted = false;
    }

    render() {
        if (this.state.loaded) {
        var appointments = this.state.appointments.appointments.map((appointment) => {
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
            return (
                <div>Loading...</div>
            )
            }
    }

}

export default InstructorDashBoard;

const container = document.getElementById('root');
render(<InstructorDashBoard />, container);
