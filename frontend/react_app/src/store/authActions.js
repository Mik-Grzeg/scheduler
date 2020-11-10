import axios from 'axios';
import * as actionTypes from './authActionTypes';
import * as settings from '../settings';

const SESSION_DURATION = settings.SESSION_DURATION

// ########################################################
// ########################################################
// Contains Auth Action Functions. These perform two kinds of things:
// 1) Return Action Objects
    // a) Simply Return an Action Object
    // b) Perform some action and then return an Action Objet
// 2) Return A Dispatch(Action) combination
    // a)Perform an action then return a Dispatch(Action) combination.
        // This Dispatch(Action) could be used by some other function to dispatch action to the store
// ########################################################
// ########################################################


// ########################################################
// ########################################################
// Auth Action Functions returning Action Objects
// ########################################################
// ########################################################

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id, instructor) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        id: id,
        instructor: instructor
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    const token = localStorage.getItem('token');
    if (token == undefined) {
        localStorage.removeItem('expirationDate');
    } else {
        axios.post(`${settings.API_SERVER}/api/rest-auth/logout/`, {
        }, {headers: {'Authorization': `Token ${token}`}} )
        .then(response => {console.log(response)}).catch(err => {console.log(err)})
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('instructor')
        localStorage.removeItem('expirationDate');
    }

    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

// ########################################################
// ########################################################
// Auth Action Functions returning A Dispatch(Action) combination after performing some action
// ########################################################
// ########################################################

// This sets a timer, which would automatically logout the user after a specified time
export const authCheckTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime)
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${settings.API_SERVER}/api/rest-auth/login/`, {
            email: email,
            password: password
        })
        .then(response => {
            const token = response.data.key;
            const id = response.data.user.id;
            const instructor = response.data.user.is_instructor;
            const expirationDate = new Date(new Date().getTime() + SESSION_DURATION);

            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('instructor', instructor);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, id, instructor));
            dispatch(authCheckTimeout(SESSION_DURATION));
        })
        .catch(err => {
            dispatch(authFail(err))
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date() ) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token, localStorage.getItem('id'), localStorage.getItem('instructor')) );
                dispatch(authCheckTimeout( expirationDate.getTime() - new Date().getTime()) );
            }
        }
    }
}

