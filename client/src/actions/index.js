import axios from 'axios';

import {CURRENT_USER, POST_SIGNUP_FORM} from "./types";

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
                if(res.data.isValid) {
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