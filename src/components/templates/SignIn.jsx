import React , {useCallback, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import { signIn } from "../../redux/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export const SignIn = () => {
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState(""),
        [ password, setPassword ] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])
    const inputpassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"text"} onChange={inputpassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton 
                    label={"サインインする"} 
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signUp'))}>パスワードをお持ちでない方はこちら</p>
                <p onClick={() => dispatch(push('/passwordReset'))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    )
}