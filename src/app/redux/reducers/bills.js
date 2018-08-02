const initialState = {
    group1: {
        bills: []
    },
    group2: {
        bills: []
    },
    group3: {
        bills: []
    }
}

const billsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_BILL':
            return {...state, [action.payload.groupId]: {...state[action.payload.groupId], bills: [...state[action.payload.groupId].bills, action.payload]}}
        default: 
            return state;
    }
}

export default billsReducer;