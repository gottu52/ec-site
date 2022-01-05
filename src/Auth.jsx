import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { listenAuthState } from "./redux/users/operations";
import { getIsSignedIn } from "./redux/users/selector";

export const Auth = ({children}) => {
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, []);

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }
}