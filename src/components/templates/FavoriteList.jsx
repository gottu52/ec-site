import { List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { PrimaryButton } from "../attom/PrimaryButton"
import noImage from "../../assets/img/no_image.png"
import { useSelector } from "react-redux"
import { getFavorite, getUserId } from "../../redux/users/selector"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { useDispatch } from "react-redux"
import { fetchFavorite } from "../../redux/users/operations"


const useStyles = makeStyles((theme) => ({
    list: {
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            width: '80%'
        },
        [theme.breakpoints.up('md')]: {
            width: 800
        }
    },
    listItem: {
        background: "#ddd",
        margin: '20px 0',
        boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.6)'
    },
    image: {
        objectFit: 'cover',
        height: 100,
        width: 100,
        margin: '8px 40px 8px 24px'
    },
    text: {
        width: '100%'
    }
}))


export const FavoriteList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const products = getFavorite(selector)
    // console.log(favorites)

    // const products = [
    //     {
    //         id: "1",
    //         image: {noImage},
    //         name: 'テスト',
    //         price: '¥1,000'
    //     },
    //     {
    //         id: "2",
    //         image: {noImage},
    //         name: 'テスト',
    //         price: '¥1,000'
    //     },
    // ]

    useEffect(() => {
        dispatch(fetchFavorite())
    }, [])


    return(
        <List className={classes.list}>
            {products.map(product => (
                <>
                    <ListItem className={classes.listItem} key={product.id}>
                        {/* 商品画像 */}
                        <ListItemAvatar className={classes.image}>
                            <img src={product.image} alt="Favorite Product" />
                        </ListItemAvatar>
                        {/* 商品名、価格 */}
                        <div className={classes.text}>
                            <ListItemText>{product.name}</ListItemText>
                            <ListItemText>{product.price}</ListItemText>
                        </div>
                        {/* 詳細ボタン */}
                        <PrimaryButton 
                            label={'商品詳細を見る'}
                        />
                    </ListItem>
                </>
            ))}
                
        </List>
    )
}