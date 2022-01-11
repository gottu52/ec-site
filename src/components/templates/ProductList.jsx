import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { getProducts } from "../../redux/products/selector";
import { ProductCard } from "../molecule/ProductCard";

export const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    //firestoreのproductsコレクションを取ってくる
    const products =  getProducts(selector);

    //urlを取得
    const query = selector.router.location.search
    // urlからクエリパラメータを取得
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    
    //users/operaration経由でaction関数をdispatchする(ソートする度に更新)
    useEffect(() => {
        dispatch(fetchProducts(gender, category))
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
            </div>
        </section>
    )
}