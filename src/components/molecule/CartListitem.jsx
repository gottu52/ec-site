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
    list: {
        height: 28,
    },
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
    const uid = getUserId(selector)
    const image = props.product.images[0].path
    const name = props.product.name
    const size = props.product.size
    const price = props.product.price.toLocaleString()

    const removeProductFromCart = (id) => {
        return db.collection('users').doc(uid).collection('cart').doc(id)
            .delete()
    }

    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品画像" />
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText primary={name} secondary={"サイズ:" + size} />
                    <ListItemText primary={"¥" + price} />
                </div> 
                    <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
                        <DeleteIcon />
                    </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}