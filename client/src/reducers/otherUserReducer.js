import {FETCH_OTHER_USER} from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_OTHER_USER:
            return action.payload;
        default:
            return state;
    }
}