import { 
    Divider,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import { useSelector } from "react-redux"
import { getUserId } from "../../redux/users/selector"
import { db } from "../../firebase"


const useStyles = makeStyles({
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})


export const CartListItem = (props) => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    //users/uidのデータ
    const uid = getUserId(selector)
    //propsのデータ
    const image = props.product.images[0].path
    const name = props.product.name
    const size = props.product.size
    const price = props.product.price.toLocaleString()

    //カート内の商品の削除
    const removeProductFromCart = (id) => {
        return db.collection('users').doc(uid).collection('cart').doc(id)
            .delete()
    }

    return (
        <>
            <ListItem>
                {/* 商品画像 */}
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品画像" />
                </ListItemAvatar>
                {/* 商品名、サイズ、料金 */}
                <div className={classes.text}>
                    <ListItemText primary={name} secondary={"サイズ:" + size} />
                    <ListItemText primary={"¥" + price} />
                </div> 
                    {/* 削除ボタン */}
                    <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
                        <DeleteIcon />
                    </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}