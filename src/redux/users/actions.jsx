export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return{
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username,
        }
    }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return{
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role: '',
            uid: '',
            username: ''
        }
    }
}

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
    return{
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
}

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (list) => {
    return{
        type: "FETCH_ORDERS_HISTORY",
        payload: list
    }
}

export const FETCH_FAVORITE = "FETCH_FAVORITE";
export const fetchFavoriteAction = (product) => {
    return{
        type: "FETCH_FAVORITE",
        payload: product
    }
}
