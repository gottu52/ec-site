import { List } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { useSelector } from "react-redux"
import { getFavorite } from "../../redux/users/selector"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchFavorite } from "../../redux/users/operations"
import { FavoriteItem } from "../molecule/FavoriteItem"
import { push } from "connected-react-router"


const useStyles = makeStyles((theme) => ({
    list: {
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            width: '80%'
        },
        [theme.breakpoints.up('md')]: {
            width: 800
        },
    }
}))


export const FavoriteList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const products = getFavorite(selector)

    useEffect(() => {
        dispatch(fetchFavorite())
    }, [])


    return(
        <List className={classes.list}>
            {products.length > 0 && 
                (products.map(product => (
                    <div key={product.favoriteId}>
                        <FavoriteItem product={product}/>
                    </div>
                )
            ))}    
        </List>
    )
}