import React , {useCallback, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import {signIn} from "../../redux/users/operations";
import { useDispatch } from "react-redux";

export const SignIn = () => {
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState(""),
        [ password, setpassword ] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])
    const inputpassword = useCallback((event) => {
        setpassword(event.target.value)
    }, [setpassword])

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
                    label={"アカウントを登録する"} 
                    onClick={() => dispatch(signIn(email, password))}
                />
            </div>
        </div>
    )
}