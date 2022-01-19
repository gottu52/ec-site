import { Button, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { push } from "connected-react-router"
import { useDispatch, useSelector } from "react-redux"
import { PrimaryButton } from "../attom/PrimaryButton"
import { db } from "../../firebase"
import { getUserId } from "../../redux/users/selector"
import { fetchFavorite } from "../../redux/users/operations"


const useStyles = makeStyles((theme) => ({
    listItem: {
        background: "#ddd",
        margin: '20px 0',
        boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.6)'
    },
    image: {
        objectFit: 'cover',
        // height: 100,
        width: 80,
        margin: '8px 40px 8px 24px'
    },
    text: {
        width: '100%'
    },
    delete: {
        backgroundColor: "#ddd",
        color: "#000",
        fontSize: 16,
        height: 52,
        marginBottom: 16,
        width: 200,
        marginLeft: 20
    }
}))


export const FavoriteItem = (props) => {
    const product = props.product
    const dispatch = useDispatch()
    const classes = useStyles()
    const selector = useSelector(state => state)

    //リストから削除したい
    const uid = getUserId(selector)
    const removeFavorite = (id) => {
        return async(dispatch, getState) => {
             db.collection('users').doc(uid).collection('favorite').doc(id).delete()
                .then(() => {
                    dispatch(fetchFavorite())
                })
        }
    }

    return(
        <ListItem className={classes.listItem} key={product.id}>
            {/* 商品画像 */}
            <ListItemAvatar className={classes.image}>
                <img src={product.images[0].path} alt="Favorite Product" />
            </ListItemAvatar>
            {/* 商品名、価格 */}
            <div className={classes.text}>
                <ListItemText>{product.name}</ListItemText>
                <ListItemText>{'¥' + product.price.toLocaleString()}</ListItemText>
            </div>
            {/* 詳細ボタン */}
            <PrimaryButton 
                label={'詳細'}
                onClick={() => dispatch(push('/product/' + product.productId))}
            />
            <Button
                className={classes.delete}
                variant="contained"
                onClick={() => dispatch(removeFavorite(product.favoriteId))}
            >
                削除
            </Button>
        </ListItem>
    )
}
