import {push} from 'connected-react-router';
import {auth, FirebaseTimestamp, db} from "../../firebase/index";
import { fetchFavoriteAction, fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction } from './actions';

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
                //firestoreからデータを取ってきて
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    //actionを実行
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

//サインアップ処理
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
        //firebase.auth()のメソッドを実行(email,passwordの登録)
        return auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            //データを定数に入れ、
            const user = result.user
            //データが存在するなら、
            if(user) {
                //オブジェクトを作って
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
                //firestoreにset
                db.collection('users').doc(uid).set(userInitialData)
                .then(() => {
                    //最後にページ遷移
                    dispatch(push('/'))
                })
            }
        })
    }
}

//ログアウト処理
export const signOut = () => {
    return async(dispatch) => {
        //fireatore.auth()のメソッドを実行
        auth.signOut()
            .then(() => {
                //actionとページ遷移
                dispatch(signOutAction())
                window.location.reload()
                dispatch(push('/signIn'))
            })
    }
}

//パスワードのリセット処理
export const resetPassword = (email) => {
    return async(dispatch) => {
        //Validation
        if(email === "") {
            alert('必須項目が未入力です')
            return false
        } else {
            //firestoreのメソッドを実行
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


//カートに商品を追加する
export const setProductToCart = (addedProduct) => {
    return async(dispatch, getState) => {
        //usersのidを取得し
        const uid = getState().users.uid
        //それを使ってcollection('users')のcartのデータを取得
        const cartRef = db.collection('users').doc(uid).collection('cart').doc()
        //cartコレクションに追加するデータに['cartId']のフィールドを追加
        addedProduct['cartId'] = cartRef.id

        //最後にcartコレクションにデータを追加し、ホームページに遷移
        await cartRef.set(addedProduct)
        dispatch(push('/'))
    }
}

//お気に入りに商品を追加する
export const setProductToFavorite = (addedProduct) => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid
        const favoriteRef = db.collection('users').doc(uid).collection('favorite').doc()
        addedProduct['favoriteId'] = favoriteRef.id

        await favoriteRef.set(addedProduct)
        dispatch(push('/'))
    }
}

//カートのactionを実行
export const fetchProductsInCart = (products) => {
    return async(dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

//お気に入り商品のactionを実行
export const fetchFavorite = () => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid
        const list = []
        db.collection('users').doc(uid).collection('favorite').get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push(data)
                })
                dispatch(fetchFavoriteAction(list))
            })
    }
}

//注文履歴のaction関数の実行
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

