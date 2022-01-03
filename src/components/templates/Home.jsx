import { useSelector } from "react-redux";
import { getUserId, getUserName } from "../../redux/users/selector";

export const Home = () => {
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);

    return (
        <div>
            <h1>HOME</h1>
            <p>{uid}</p>
            <p>{username}</p>
        </div>
    )
}