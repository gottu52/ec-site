import React , {useCallback, useState} from "react";
import TextInput from "../molecule/TextInput.jsx";

export const SignUp = () => {

    const [ username, setUsername ] = useState(""),
        [ email, setEmail ] = useState(""),
        [ passward, setPassward ] = useState(""),
        [ confirmPassward, setConfirmPassward ] = useState("");

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername])
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])
    const inputPassward = useCallback((event) => {
        setPassward(event.target.value)
    }, [setPassward])
    const inputConfirmPassward = useCallback((event) => {
        setConfirmPassward(event.target.value)
    }, [setConfirmPassward])

    return(
        <div className="c-section-container">
            <h2 className="u-text_headline u-text-center">アカウント登録</h2>
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
                rows={1} value={passward} type={"text"} onChange={inputPassward}
            />
            <TextInput 
                fullWidth={true} label={"パスワード（再確認)"} multiline={false} required={true}
                rows={1} value={confirmPassward} type={"text"} onChange={inputConfirmPassward}
            />
        </div>
    )
}