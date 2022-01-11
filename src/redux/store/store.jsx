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


// store = {

//     usersコレクション
//     users: {
//         username,
//         uid,
//         email,
//         role,
//         created_at,
//         updates_at,
//         cartコレクション
//         cart: [
//             {
//                 cartId,
//                 productId,
//                 name,
//                 description,
//                 price,
//                 quantity,
//                 size,
//                 gender,
//                 added_at,
//                 images: [
//                     {id, path}
//                 ]
//              },
//         ]
//         ordersコレクション
//         orders: [
//              {
//                  id,
//                  amount,
//                  created_at,
//                  updated_at,
//                  shipping_date,
//                  products: [
//                      id,
//                      price,
//                      size,
//                      images: {id, path}
//                  ]
//              }
//         ]
//     },

//     productsコレクション
//     products: {
//          list: [
//              {
//                  id,
//                  name,
//                  description,
//                  category,
//                  price,
//                  added_at,
//                  updated_at,
//                  images: [
//                      {id, path}
//                  ],
//                  sizes: [
//                      {quantity, size}
//                  ]
//              }
//          ]
//     },

//     categoriesコレクション(ソートのためのやつ)
//     categories: {
//         nadvamvako: {
//             id(パンツとか),
//             name,
//             order(並び順)
//         }
//     }
// }
