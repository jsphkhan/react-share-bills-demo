const initialState = {
    currency: '$', //can have better logic here
    group1: {
        title: 'Group1',
        description: 'The Party Group',
        createdOn: Date.now(),
        members: ['You', 'Sam', 'Jack']
    },
    group2: {
        title: 'Group2',
        description: 'Apartment Mates',
        createdOn: Date.now(),
        members: ['You', 'Sam', 'Lisa']
    },
    group3: {
        title: 'Group3',
        description: 'College Canteen',
        createdOn: Date.now(),
        members: ['You', 'Sam', 'Lisa', 'Jack']
    },
    allGroups: ['group1', 'group2', 'group3']
}

const groupsReducer = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}

export default groupsReducer;