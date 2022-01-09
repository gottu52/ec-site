import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { getProducts } from "../../redux/products/selector";
import { ProductCard } from "../molecule/ProductCard";

export const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const products =  getProducts(selector);

    //urlを取得
    const query = selector.router.location.search
    //?=で始まるurlですか？（クエリパラメータの検証）
    //  ^\は先頭を表す
    // splitで?gender=1以降の文字列を取得（この場合はmaleとかfemaleとか）
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    //同じ要領でカテゴリーも
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    
    //fetchProducts in operation(products)
    useEffect(() => {
        dispatch(fetchProducts(gender, category))
    }, [query])

    return(
        <section className="c-section-wrapin">
            <div className="p-grid__row">
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