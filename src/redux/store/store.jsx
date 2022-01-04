import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../users/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { productsReducer } from "../products/reducers";

export const createStore = (history) => {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: userReducer,
            products: productsReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}

