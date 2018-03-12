import axios from 'axios';

import {CURRENT_USER, POST_SIGNUP_FORM, FETCH_POSTS, FETCH_OTHER_USER, FETCH_OTHER_USER_POSTS} from "./types";

export const fetchCurrentUser = () => dispatch => {
    axios.get('/auth/current_user')
        .then(
            (res) => {
                dispatch({
                    type: CURRENT_USER,
                    payload: res.data
                })
            }
        );
};

export const postSignUpForm = (values) => dispatch => {
    axios.post('/signUp', values)
        .then(
            (res) => {
                if (res.data.isValid) {
                    document.location.href = '/';
                } else {
                    dispatch({
                        type: POST_SIGNUP_FORM,
                        payload: res.data
                    });
                }
            }
        )
};

export const fetchPosts = (postNo) => dispatch => {
    axios.get('/api/fetch_posts?postNo=' + postNo)
        .then(
            (res) => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: res.data
                });
            }
        );
};

export const fetchOtherUser = (username) => dispatch => {
    axios.get('/api/fetchOtherUser?username=' + username)
        .then((res) => {
            dispatch({
                type: FETCH_OTHER_USER,
                payload: res.data
            })
        });
};

export const fetchOtherUserPosts = (username, postNo) => dispatch => {
    axios.get('/api/fetch_otheruser_posts?username='+username+'&postNo='+postNo)
        .then((res) => {
            dispatch({
                type: FETCH_OTHER_USER_POSTS,
                payload: res.data
            })
        });
};