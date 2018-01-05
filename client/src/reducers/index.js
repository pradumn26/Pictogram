import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import currentUserReducer from './currentUserReducer';
import signUpReducer from './signUpReducer';

const combinedReducer = combineReducers({
    form: reduxForm,
    currentUser: currentUserReducer,
    signUpReducer
});

export default combinedReducer;