import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { getProducts } from "../../redux/products/selector";
import { ProductCard } from "../molecule/ProductCard";

const useStyles = makeStyles({
    error: {
        margin: '30px auto'
    },
    text: {
        fontSize: '25px',
        fontWeight: 'bold'
    }
})

export const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const classes = useStyles()

    //firestoreのproductsコレクションを取ってくる
    const products =  getProducts(selector);

    //urlを取得
    const query = selector.router.location.search
    // urlからクエリパラメータを取得
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    const name = /^\?name=/.test(query) ? query.split('?name=')[1] : "";
    console.log(name)
    
    //products/operaration経由でaction関数をdispatchする(ソートする度に更新)
    useEffect(() => {
        dispatch(fetchProducts(gender, category, name))
    }, [query])

    return(
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {/* selectorでとってきたデータを一覧で表示 */}
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard 
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            images={product.images}
                            id={product.id}
                        />
                    ))
                )}
                {products.length === 0 && (
                    <div className={classes.error}>
                        <p className={classes.text}>検索した商品は見つかりませんでした。</p>
                    </div>
                )}
            </div>
        </section>
    )
}