import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../../redux/users/actions";

export const Login = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <h1>LOGIN</h1>
            <button onClick={() => {
                dispatch(signInAction({uid: "0127", username: "mahuyu"}));    
                dispatch(push('/'))
            }}>
                ログインする
            </button>
        </div>
    )
}