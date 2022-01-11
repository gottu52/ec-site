import React , {useCallback, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import {signUp} from "../../redux/users/operations";
import { useDispatch } from "react-redux";

export const SignUp = () => {
    const dispatch = useDispatch();

    //入力内容のuseState
    const [ username, setUsername ] = useState(""),
        [ email, setEmail ] = useState(""),
        [ password, setPassword ] = useState(""),
        [ confirmPassword, setConfirmPassword ] = useState("");

    //入力内容のonChange
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername])
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])
    const inputpassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])
    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword])

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"text"} onChange={inputpassword}
            />
            <TextInput 
                fullWidth={true} label={"パスワード（再確認)"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"text"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                {/* サインアップを実行(users/operation) */}
                <PrimaryButton 
                    label={"アカウントを登録する"} 
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
            </div>
        </div>
    )
}