import {POST_SIGNUP_FORM} from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case POST_SIGNUP_FORM:
            return action.payload;
        default:
            return state;
    }
}
