import { Divider } from "@material-ui/core"

import { TextDetail } from "./TextDetail"


const dateTimeToString = (date) => {
    return date.getFullYear() + "-" 
        + ("00" + (date.getMonth()+1)).slice(-2) +  "-"
        + ("00" + date.getDate()).slice(-2) + "-"
        + ("00" + date.getHours()).slice(-2) + "-"
        + ("00" + date.getMinutes()).slice(-2) + "-"
        + ("00" + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    return date.getFullYear() + "-" 
        + ("00" + (date.getMonth()+1)).slice(-2) +  "-"
        + ("00" + date.getDate()).slice(-2)
}


export const OrderHistoryItem = (props) => {
    const order = props.order
    const orderedDatetime = dateTimeToString(order.updated_at.toDate())
    const shippingDate = dateToString(order.shipping_date.toDate())
    const price = "¥" + order.amount.toLocaleString()

    return(
        <div>
            <div className="module-spacer--small">
                <TextDetail label={"注文ID"} value={order.id} />
                <TextDetail label={"注文日時"} value={orderedDatetime} />
                <TextDetail label={"発送予定日"} value={shippingDate} />
                <TextDetail label={"注文金"} value={price} />
                <div className="module-spacer--extra-extra-small"></div>
                <Divider />
            </div>
        </div>
    )
}