import * as Actions from "./actions";
import { initialState } from "../store/initialState";

export const userReducer = (state = initialState.users, action) => {
    switch(action.type) {
            default:
                return state;
    }
}
