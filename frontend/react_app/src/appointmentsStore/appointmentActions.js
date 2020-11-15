import * as settings from '../settings';
import axios from 'axios';

export const FETCH_APPOINTMENTS_BEGIN = 'FETCH_APPOINTMENTS_BEGIN';
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';

export const fetchAppointmentsBegin = () => ({
    type: FETCH_APPOINTMENTS_BEGIN
});

export const fetchAppointmentsSuccess = lessons => ({
    type: FETCH_APPOINTMENTS_SUCCESS,
    payload: { lessons }
});

export const fetchAppointmentsFailure = error => ({
    type: FETCH_APPOINTMENTS_FAILURE,
    payload: { error } 
});

export function fetchAppointments(token ) {
    return dispatch => {
        dispatch(fetchAppointmentsBegin());

        let headers = { 'Authorization': `Token ${token}` };
        let url = settings.API_SERVER + '/api/instructors/'
        let method = 'get';
  
        let config = { headers, method, url }
  
        axios(config)
        .then(response => {
            dispatch(fetchAppointmentsSuccess(response.data));
            console.log(response.data)
            return response.data
          });
    }
}