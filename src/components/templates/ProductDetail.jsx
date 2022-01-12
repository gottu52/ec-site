import { makeStyles } from '@material-ui/styles';
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";

import { db, FirebaseTimestamp } from "../../firebase";
import { ImageSwiper } from "../molecule/ImageSwiper";
import { SizeTable } from "../molecule/SizeTable";
import { setProductToCart, setProductToFavorite } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        }
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    price: {
        fontSize: 36
    }
}))

//複数行の文章の改行を<br />タグに置き換える
const returnCodeToBr = (text) => {
    if(text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br />'))
    }
}

export const ProductDetail = () => {
    const selector = useSelector(state => state)
    const classes = useStyles();
    const dispatch = useDispatch()

    //reduxで管理しているルーティングの情報からパスネーム（URL)を引き出す
    const path = selector.router.location.pathname;
    const id = path.split("/product/")[1]

    //ページに反映されるデータ
    const [product, setProduct] = useState(null);

    useEffect(() => {
        //urlから取ってきたidと一致するproductsのデータを取ってくる
        db.collection('products').doc(id).get()
            .then(doc => {
                const data = doc.data();
                setProduct(data)
            })
    }, [])

    //カートアイコンに渡す関数
    //カートに商品を追加する関数(users/operation)をdispatchで実行する
    const addProductToCart = useCallback((selectedSize) => {
        const timestamp = FirebaseTimestamp.now();
        dispatch(setProductToCart({
            added_at: timestamp,
            name: product.name,
            description: product.description,
            category: product.category,
            gender: product.gender,
            price: product.price,
            images: product.images,
            productId: product.id,
            quantity: 1,
            size: selectedSize
        }))
    }, [product])

    //お気に入りリストに追加する関数
    const addProductToFavorite = useCallback(() => {
        dispatch(setProductToFavorite({
            images: product.images,
            name: product.name,
            price: product.price,
        }))
    }, [product])

    return(
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid-row">
                    {/* 商品画像 */}
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className={classes.detail}>
                        {/* 商品名 */}
                        <h2 className="u-text__headline">{product.name}</h2>
                        {/* 価格 */}
                        <p className={classes.price}>{product.price.toLocaleString()}</p>
                        <div className="module-spacer--small" />
                        {/* サイズ、数量を表示するmolecule */}
                        <SizeTable sizes={product.sizes} addProductToCart={addProductToCart} addProductToFavorite={addProductToFavorite}/>
                        <div className="module-spacer--small" />
                        {/* 商品の説明 */}
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}
        </section>
    )
}