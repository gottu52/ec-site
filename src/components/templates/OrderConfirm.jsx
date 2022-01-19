import { useCallback, useMemo } from "react"
import { useDispatch, useSeletor } from "react-redux"
import { makeStyles } from "@material-ui/core"
import { List, Divider } from "@material-ui/core"

import { CartListItem } from "../molecule/CartListitem"
import { getProductInCart } from "../../redux/users/selector"
import { PrimaryButton } from "../attom/PrimaryButton"
import { useSelector } from "react-redux"
import { TextDetail } from "../molecule/TextDetail"
import { orderProducts } from "../../redux/products/operations"


const useStyles = makeStyles((theme) => ({
    detailBox: {
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: 320,
        },
        [theme.breakpoints.up('sm')]: {
            width: 512
        }
    },
    orderBox: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0, 0, 0, 0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288
    }
}))


export const OrderConfirm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    // users/uid/cartのデータ
    const productsInCart = getProductInCart(selector)

    //料金全般の計算
    const subTotal = useMemo(() => {
        return productsInCart.reduce((sum, product) => sum += product.price, 0)
    }, [productsInCart])
    const shippingFee = (subTotal > 10000) ? 0 : 210
    const tax = subTotal * 0.1
    const total = subTotal + shippingFee + tax

    //注文を発注する関数をdispatch（products/operation.jsx）
    const order = useCallback(() => {
        dispatch(orderProducts(productsInCart, total))
    }, [dispatch, productsInCart, total])

    return (
        <section className="c-section-wrapin">
            {/* タイトル */}
            <h2 className="u-text__headline">注文の確認</h2>
            <div className="p-grid__row">
                {/* カート内の商品一覧 */}
                <div className={classes.detailBox}>
                    <List>
                        {/* カート内の情報を参照してCartListItemコンポーネントを生成（購入する商品の確認） */}
                        {productsInCart.length > 0 && (
                            productsInCart.map(product => (
                                <CartListItem key={product.cartId} product={product} />
                            ))
                        )}
                    </List>
                </div>
                {/* 計算結果を反映する */}
                <div className={classes.orderBox}>      
                    <TextDetail label={"商品の合計金額"} value={subTotal.toLocaleString()} />
                    <TextDetail label={"送料"} value={shippingFee.toLocaleString()} />
                    <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
                    <Divider />
                    <TextDetail label={"合計(税込)"} value={"¥" + total.toLocaleString()} />
                    {/* 注文する（operation.jsx内の関数） */}
                    <PrimaryButton label={"注文する"} onClick={order} />
                </div>
            </div>
        </section>
    )
}