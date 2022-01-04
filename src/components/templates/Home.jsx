import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signOut } from "../../redux/users/operations";
import { getUserId, getUserName } from "../../redux/users/selector";

export const Home = () => {
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);
    const dispatch = useDispatch()

    return (
        <div>
            <h1>HOME</h1>
            <p>{uid}</p>
            <p>{username}</p>
            <p onClick={dispatch(() => signOut())}>サインアウト</p>
        </div>
    )
}