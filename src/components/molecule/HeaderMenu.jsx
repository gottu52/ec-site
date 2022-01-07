import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { getProductInCart } from "../../redux/users/selector";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { fetchProductsInCart } from "../../redux/users/operations";


export const HeaderMenu = (props) => {
    const selector = useSelector(state => state);
    let productsInCart = getProductInCart(selector);
    const dispatch = useDispatch();

    useEffect(() => {
        const unscribe = db.collection('user').doc('userId').collection('cart')
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data()
                    const changeType = change.type

                    switch(changeType) {
                        case 'added':
                            productsInCart.push(product)
                            break;
                        case 'modifed':
                            //変更があった場所がどこかを調べ、該当する箇所にデータを入れる
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchProductsInCart(productsInCart))
            })
        return () => unscribe
    }, [])

    return(
        <>
            <IconButton>
                <Badge badgeContent={productsInCart.length} color="secondary">
                   <ShoppingCart /> 
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton onClick={(event) => props.onClick(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}