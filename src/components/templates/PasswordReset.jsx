import React , {useCallback, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import { resetPassword } from "../../redux/users/operations";
import { useDispatch } from "react-redux";

export const PasswordReset = () => {
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードの再設定</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton 
                    label={"パスワードを再設定する"} 
                    onClick={() => dispatch(resetPassword(email))}
                />
            </div>
        </div>
    )
}