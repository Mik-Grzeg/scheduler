const initialState = {
    cells: []
};


const checkedReducer = (state=initialState, action ) => {
    switch(action.type) {
        case 'HANDLE_ADD_CELL': 
            return {...state,
                cells: [...state.cells, action.payload]
            };
        default:
            return state;
    }
}
export default checkedReducer