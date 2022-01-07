import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";

import { db } from "../../firebase";
import { ImageSwiper } from "../molecule/ImageSwiper";
import { SizeTable } from "../molecule/SizeTable";

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

    //reduxで管理しているルーティングの情報からパスネーム（URL)を引き出す
    const path = selector.router.location.pathname;
    const id = path.split("/product/")[1]

    const [product, setProduct] = useState(null);

    useEffect(() => {
        db.collection('products').doc(id).get()
            .then(doc => {
                const data = doc.data();
                setProduct(data)
            })
    }, [])

    return(
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid-row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>{product.price.toLocaleString()}</p>
                        <div className="module-spacer--small" />
                        <SizeTable sizes={product.sizes} />
                        <div className="module-spacer--small" />
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}
        </section>
    )
}