import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../users/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";

export const createStore = (history) => {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: userReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}

