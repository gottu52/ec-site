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

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

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