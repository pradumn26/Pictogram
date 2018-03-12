import {FETCH_OTHER_USER_POSTS} from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_OTHER_USER_POSTS:
            return action.payload;
        default:
            return state;
    }
}