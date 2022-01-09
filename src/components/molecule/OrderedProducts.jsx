import {List, ListItem, ListItemAvatar, ListItemText, Divider} from "@material-ui/core"
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"

import {PrimaryButton} from "../attom/PrimaryButton"
import { useCallback } from "react"


const useStyles = makeStyles({
    list: {
        background: '#fff',
        height: 'auto'
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})


export const OrderedProducts = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const products = props.products

    const goToProductDetail = useCallback((id) => {
        dispatch(push('product/' + id))
    }, [])

    return(
        <List>
            {products.map(product => (
                <>
                    <ListItem className={classes.list} key={products.id} >
                        <ListItemAvatar>
                            <img 
                                className={classes.image}
                                src={product.images[0].path}
                                alt={"Orderd Product"}
                            />
                        </ListItemAvatar>
                        <div className={classes.text}>
                            <ListItemText primary={product.name} secondary={"サイズ:" + product.size} />
                            <ListItemText primary={"¥" + product.price.toLocaleString()} />
                        </div>
                        <PrimaryButton 
                            label={"商品の詳細を見る"}
                            onClick={() => goToProductDetail(product.id)}
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    )
}