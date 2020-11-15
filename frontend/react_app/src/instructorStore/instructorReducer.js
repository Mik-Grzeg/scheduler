import { 
    FETCH_INSTRUCTOR_BEGIN,
    FETCH_INSTRUCTOR_SUCCESS, 
    FETCH_INSTRUCTOR_FAILURE
} from './instructorActions';

const initialState = {
    instructor: [],
    loading: false,
    error: null
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

const instructorBeginReducer = (state, action ) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const instructorSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        instructor: action.payload.lessons
    });
}

const instructorFailureReducer = (state, action) => {
    return updateObject(state, {
        error: action.payload.error,
        loading: false,
        instructor: []
    });
}

const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_INSTRUCTOR_BEGIN: return instructorBeginReducer(state, action);
        case FETCH_INSTRUCTOR_SUCCESS: return instructorSuccessReducer(state, action);
        case FETCH_INSTRUCTOR_FAILURE: return instructorFailureReducer(state, action);
        default:
            return state;
    }
}



export default Reducer