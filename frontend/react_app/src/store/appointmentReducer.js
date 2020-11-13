import { 
    FETCH_APPOINTMENTS_BEGIN,
    FETCH_APPOINTMENTS_SUCCESS, 
    FETCH_APPOINTMENTS_FAILURE
} from './appointmentActions';

const initialState = {
    appointments: [],
    loading: false,
    error: null
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

const appointmentBeginReducer = (state, action ) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const appointmentSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        appointments: action.payload.lessons
    });
}

const appointmentFailureReducer = (state, action) => {
    return updateObject(state, {
        error: action.payload.error,
        loading: false,
        appointments: []
    });
}

const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_APPOINTMENTS_BEGIN: return appointmentBeginReducer(state, action);
        case FETCH_APPOINTMENTS_SUCCESS: return appointmentSuccessReducer(state, action);
        case FETCH_APPOINTMENTS_FAILURE: return appointmentFailureReducer(state, action);
        default:
            return state;
    }
}

export default Reducer