import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { List } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { fetchOrdersHistory } from "../../redux/users/operations"
import { getOrdersHistory } from "../../redux/users/selector"
import { OrderHistoryItem } from "../molecule/OrderHistoryItem"


const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    }
}))


export const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const orders =  getOrdersHistory(selector)

    console.log(orders)

    useEffect(() => {
        dispatch(fetchOrdersHistory())
    }, [])

    return (
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order => <OrderHistoryItem key={order.id} order={order} />)
                )}
            </List>
        </section>
    )
}