import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/styles"
import { push } from "connected-react-router"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getProductInCart } from "../../redux/users/selector"
import { GreyButton } from "../attom/GreyButton"
import { PrimaryButton } from "../attom/PrimaryButton"
import { CartListItem } from "../molecule/CartListitem"


const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
})

export const CartList = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    //usersドキュメント内のカートの情報を取ってくる
    const productsInCart = getProductInCart(selector)
    const dispatch = useDispatch()

    //ページ遷移の関数
    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    }, [])
    const backToHome = useCallback(() => {
        dispatch(push('/'))
    }, [])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List className={classes.root}>
                {/* カートに商品が入っている場合、
                その情報をpropsとしてCartListItemコンポーネントを表示する */}
                {productsInCart.length > 0 && (
                    productsInCart.map((product) => (
                        <CartListItem key={product.cartId} product={product} />
                    )
                ))}
            </List>
            <div className="module-spacer--medium" />
            {/* ページ遷移 */}
            <div className="p-grid__column">
                {productsInCart.length > 0  && (
                    <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
                )}
                <div className="module-spacer--extra-extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}