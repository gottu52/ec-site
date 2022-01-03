import { signInAction } from "./actions";
import {push} from 'cennected-react-router';
import {auth, FirebaseTimestamp, db} from "../../firebase/index";

export const signIn = () => {
    return async(dispatch, getState) => {

        const state = getState();
        const isSignedIn = state.users.isSignedIn;

        if(!isSignedIn) {
            const url = "https://api.github.com/users/detiger"
            const response = await fetch(url)
                            .then(res => res.json())
                            .catch(() => null)
            const username = response.login
            dispatch(signInAction({
                isSignedIn: "true",
                uid: "0127",
                username: username
            }))
            dispatch(push('/'))
        }
    }
}

export const signUp = (username, email, passward, confirmPassward) => {
    return async(dispatch) => {
        // Validation
        if (username === "" || email === "" || passward === "" || confirmPassward === "") {
            alert("必須項目が未入力です")
            return false
        }
        if (passward !== confirmPassward) {
            alert("パスワードが一致しません。もう一度入力してください")
            return false
        }
        return auth.createUserWithEmailAndPassward(email, passward)
        .then(result => {
            const user = result.user
            if(user) {
                const uid = user.uid
                const timestamp = FirebaseTimestamp.naw()
                const userInitialData = {
                    created_at: timestamp,
                    email: email,
                    role: "customer",
                    uid: uid,
                    updated_at: timestamp,
                    username: username
                }
                db.collection('users').doc(uid).set(userInitialData)
                .then(() => {
                    dispatch(push('/'))
                })
            }
        })
    }
}