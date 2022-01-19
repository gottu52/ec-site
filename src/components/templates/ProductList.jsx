import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { getProducts } from "../../redux/products/selector";
import { getUserRole } from "../../redux/users/selector";
import { ProductCard } from "../molecule/ProductCard";


const useStyles = makeStyles({
    error: {
        margin: '30px auto'
    },
    text: {
        fontSize: '25px',
        fontWeight: 'bold'
    },
    paginate: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'space-between',
        margin: '30px 100px',
        cursor: 'pointer'
    }
})

export const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const classes = useStyles()

    //roleをget
    const role = getUserRole(selector)
    console.log(role)

    //firestoreのproductsコレクションを取ってくる
    const products =  getProducts(selector);
    
    //urlを取得
    const query = selector.router.location.search
    // urlからクエリパラメータを取得
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    const name = /^\?name=/.test(query) ? query.split('?name=')[1] : "";
    
    //products/operaration経由でaction関数をdispatchする(ソートする度に更新)
    useEffect(() => {
        dispatch(fetchProducts(gender, category, name))
    }, [query])

    useEffect(() => [
        setItemOffset(0)
    ], [query])

    //----------------------------以下paginate----------------------------------------

    //1ページに表示されるコンテンツの数
    const itemsPerPage = 6

    //表示するコンテンツ全部の数
    const [items, setItems] =useState([])
    useEffect(() => {
        if(products.length > 0) {
            const li = []
            for(let i = 0; i < products.length; i++) {
                li.push(i + 1)
            }
            setItems([...li])
        }
    }, [products])

    //pageCount = ページの枚数
    const [pageCount, setPageCount] = useState(0);
    //itemOffset = 表示されるコンテンツの最初の番号(0, 4, 8, 12)
    const [itemOffset, setItemOffset] = useState(0);
    // endOffset = 表示されるコンテンツの最後の番号(4, 8, 12, 16)
    const [endOffset, setEndOffset] = useState(0)
    //ページの設定
    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, endOffset, itemsPerPage, items]);

    //currentItems = 表示されるコンテンツの配列
    const [currentItems, setCurrentItems] = useState([]);
    //表示されるコンテンツの設定
    useEffect(() => {
        const paginateItem = []
        if(products.length > 0) {
           for (let i = itemOffset; i < endOffset; i++) {
               if(i < items.length) {
                   paginateItem.push(products[i])
               }
            } 
        }
        setCurrentItems([...paginateItem])
    }, [itemOffset, endOffset, products, items])

    // クリックしたときにページ移動するために関数
    const handlePageClick = (event) => {
        //event.selected = クリックした番号(0~3), prevの場合は一個前の番号,nextは次の番号
        //newOffset = (クリックした番号 * 1ページに表示するコンテンツの数) / 表示するコンテンツ全部の数　の余り
        const newOffset = event.selected * itemsPerPage
        setItemOffset(newOffset);
    };

    //---------------------------------paginate終わり-----------------------------------


    return(
        <>
            <section className="c-section-wrapin">
                <div className="p-grid__row">
                    {/* selectorでとってきたデータを一覧で表示 */}
                    {currentItems.length > 0 && (
                        currentItems.map(currentItem => (
                            <ProductCard 
                                key={currentItem.id}
                                name={currentItem.name}
                                price={currentItem.price}
                                images={currentItem.images}
                                id={currentItem.id}
                                role={role}
                            /> 
                        ))
                    )}
                    {products.length === 0 && name && (
                        <div className={classes.error}>
                            <p className={classes.text}>検索した商品は見つかりませんでした。</p>
                        </div>
                    )}
                </div>
                <ReactPaginate
                    className={classes.paginate}
                    //省略記号
                    breakLabel="..."
                    //前のページに戻る
                    previousLabel="< previous"
                    //次のページに進む
                    nextLabel="next >"
                    //クリックでページ移動
                    onPageChange={handlePageClick}
                    //表示されるページの範囲(?)
                    pageRangeDisplayed={3}
                    //ページの枚数
                    pageCount={pageCount}
                    //ページが0の時にprevを非表示にする(無効)
                    renderOnZeroPageCount={null}
                />
            </section>   
        </>
        
        
    )
}