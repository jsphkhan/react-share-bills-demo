import { combineReducers } from 'redux';
import groupsReducer from './groups';
import billsReducer from './bills';

const rootReducer = combineReducers({groupsReducer, billsReducer});
export default rootReducer;