import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { getProductInCart, getUserId } from "../../redux/users/selector";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { fetchProductsInCart } from "../../redux/users/operations";
import { push } from "connected-react-router";


export const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    // users/collection('cart')のデータ[]
    let productsInCart = getProductInCart(selector);
    // user/collection('uid')のデータ
    const userId = getUserId(selector);
    
    //バッジの値を取得(firestoreのリスナー)
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(userId).collection('cart')
            //onSnapshotでリスナーを設定
            .onSnapshot(snapshots => {
                //リスナーではdocChanges()を使用すること
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data()
                    //change.typeに応じて処理する
                    const changeType = change.type
                    switch(changeType) {
                        case 'added':
                            productsInCart.push(product)
                            break;
                        //中身が変化した時
                        case 'modified':
                            //変更があった場所がどこかを調べ、
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            //該当する箇所にデータを入れる
                            productsInCart[index] = product
                            break;
                        case 'removed':
                            //削除するデータを、フィルターをかけて配列から取り除く
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })
                //最後に変化した後のデータをfetchする
                dispatch(fetchProductsInCart(productsInCart))
            })
        //関数コンポーネントのreturnにすることで、
        //unMountしたときにリッスンを解除できる
        return () => unsubscribe()
    }, [])
    

    return(
        <>
            {/* ショッピングアイコン */}
            <IconButton onClick={() => dispatch(push('/cart'))}>
                {/* バッジ(カートの中の商品の数) */}
                <Badge badgeContent={productsInCart.length} color="secondary">
                   <ShoppingCart /> 
                </Badge>
            </IconButton>
            {/* お気に入りアイコン */}
            <IconButton onClick={() => dispatch(push('/favorite'))}>
                <FavoriteBorder />
            </IconButton>
            {/* メニューボタン */}
            <IconButton onClick={(event) => props.onClick(event, true)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}