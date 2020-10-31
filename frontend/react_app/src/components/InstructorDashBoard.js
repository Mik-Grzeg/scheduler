import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { isValidDate } from './Schedule';
import * as settings from '../settings';
import InstructorTable from './InstructorTable';

class InstructorDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            loaded: false
        }
    }

    componentDidMount() {
        let pk = '4';
        // pk, isValidDate should be rewritten
        let url = '/api/instructor=' + pk + isValidDate();
        axios.get(`${settings.API_SERVER}${url}`)
        .then(response => {console.log(response)}).catch(err => {console.log(err)})
        .then(response => {
            this.setState(() => {
                return {
                    appointments: response.data,
                    loaded: true
                }
            })
        })
    }

    render() {
        var appointments = this.state.appointments.map((appointment) => {
            return {    "start_time": appointment.start_time,
                        "client": appointment.client                
            }
        })
        const instructor = { "name": 'Mikolaj',
                            "id": '4'};
        console.log(settings.hours)
        const full_day_schedule = settings.hours.map(_hour => {
            if (appointments[0] && _hour === appointments[0].start_time) {
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
    }
}

export default InstructorDashBoard;

const container = document.getElementById('root');
render(<InstructorDashBoard />, container);
