import {push} from 'connected-react-router';
import {auth, FirebaseTimestamp, db} from "../../firebase/index";
import { fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction } from './actions';

//サインイン処理
export const signIn = (email, password) => {
    return async(dispatch) => {
        // Validation
        if (email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }
        //firebase.auth()のメソッド、signInWithEmailAndPasswordを実行(引数にemail,password)
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            //取ってきたデータを定数に入れる
            const user = result.user
            //データが存在するなら
            if(user) {
                //中のデータをオブジェクトに入れてactionする
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: data.uid,
                        username: data.username
                    }))
                    //ホーム画面に遷移
                    dispatch(push('/'))
                })
            }
        })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async(dispatch) => {
        // Validation
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("必須項目が未入力です")
            return false
        }
        if (password !== confirmPassword) {
            alert("パスワードが一致しません。もう一度入力してください")
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            if(user) {
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()
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

export const signOut = () => {
    return async(dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(push('/signIn'))
            })
    }
}

export const listenAuthState = () => {
    return async(dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user) {
                const uid = user.uid
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))
                    })
            } else {
                dispatch(push('/signIn'))
            }
        })
    }
}

export const addProductToCart = (addedProduct) => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid
        const cartRef = db.collection('users').doc(uid).collection('cart').doc()
        addedProduct['cartId'] = cartRef.id

        await cartRef.set(addedProduct)
        dispatch(push('/'))
    }
}

export const fetchProductsInCart = (products) => {
    return async(dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const fetchOrdersHistory = () => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid
        const list = []

        //更新が新しい順にデータをゲット
        db.collection('users').doc(uid).collection('orders').orderBy('updated_at', 'desc').get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push(data)
                })
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}

export const resetPassword = (email) => {
    return async(dispatch) => {
        if(email === "") {
            alert('必須項目が未入力です')
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('パスワード再設定のメールを送信いたしました。ご確認ください。')
                    dispatch(push('/signIn'))
                }).catch(() => {
                    alert('パスワードの再設定に失敗しました')
                })
            }
    }
}
