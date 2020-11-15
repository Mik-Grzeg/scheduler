import * as settings from '../settings';
import axios from 'axios';

export const FETCH_INSTRUCTOR_BEGIN = 'FETCH_INSTRUCTOR_BEGIN';
export const FETCH_INSTRUCTOR_SUCCESS = 'FETCH_INSTRUCTOR_SUCCESS';
export const FETCH_INSTRUCTOR_FAILURE = 'FETCH_INSTRUCTOR_FAILURE';

export const fetchInstructorBegin = () => ({
    type: FETCH_INSTRUCTOR_BEGIN
});

export const fetchInstructorSuccess = lessons => ({
    type: FETCH_INSTRUCTOR_SUCCESS,
    payload: { lessons }
});

export const fetchInstructorFailure = error => ({
    type: FETCH_INSTRUCTOR_FAILURE,
    payload: { error } 
});

export function fetchInstructor(token, instructor) {
    return dispatch => {
        dispatch(fetchInstructorBegin());

        // Temporary date, it needs to be changed
        let date = new Date();
        // -------------------------------------

        let headers = { 'Authorization': `Token ${token}` };
        let content_type = { "Content-Type": "application/json"}
        let id = localStorage.getItem('id');
        let url = settings.API_SERVER + '/api/instructor/'
        let method = 'get';
        let params = { "pk": id}

        let config = { url, headers, content_type, method, params }
  
        axios(config)
        .then(response => {
            dispatch(fetchInstructorSuccess(response.data));
            console.log(response.data)
            return response.data
          })
          .catch(error => dispatch(fetchInstructorFailure(error)));
          ;
    }
}