import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import currentUserReducer from './currentUserReducer';
import signUpReducer from './signUpReducer';
import galleryPosts from './galleryPosts';
import otherUserReducer from './otherUserReducer';
import otherUserGalleryPosts from './otherUserGalleryPosts';

const combinedReducer = combineReducers({
    form: reduxForm,
    currentUser: currentUserReducer,
    signUpReducer,
    galleryPosts,
    otherUserReducer,
    otherUserGalleryPosts
});

export default combinedReducer;