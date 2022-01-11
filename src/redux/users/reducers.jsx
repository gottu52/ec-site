import * as Actions from "./actions";
import { initialState } from "../store/initialState";

export const userReducer = (state = initialState.users, action) => {
    switch(action.type) {
        case Actions.SIGN_IN:
            return{
                //スプレッド構文で追加
                ...state, ...action.payload
            }
        case Actions.SIGN_OUT:
            return{
                //storeのリセット
                ...action.payload
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            return{
                ...state,
                cart: [...action.payload]
            }
        case Actions.FETCH_ORDERS_HISTORY:
            return{
                ...state,
                orders: [...action.payload]
            }
        default:
            return state;
    }
}
