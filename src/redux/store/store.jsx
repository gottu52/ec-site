import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../users/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { productsReducer } from "../products/reducers";
import { createLogger } from "redux-logger";

export const createStore = (history) => {
    const logger = createLogger({
        collapsed: true,
        diff: true
    })

    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: userReducer,
            products: productsReducer
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),
            thunk
        )
    )
}

