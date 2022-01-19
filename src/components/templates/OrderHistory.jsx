import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { List } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { fetchOrdersHistory } from "../../redux/users/operations"
import { getOrdersHistory } from "../../redux/users/selector"
import { OrderHistoryItem } from "../molecule/OrderHistoryItem"
import ReactPaginate from "react-paginate"


const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    },
    paginate: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'space-between',
        margin: '30px 100px',
        cursor: 'pointer'
    }
}))


export const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    // users/uid/ordersのデータ
    const orders =  getOrdersHistory(selector)

    //action関数を実行する関数(users/operation)
    useEffect(() => {
        dispatch(fetchOrdersHistory())
    }, [])


    //---------------------以下、paginate--------------------

    //1ページに表示されるコンテンツの数
    const itemsPerPage = 4

    //表示するコンテンツ全部の数
    const [items, setItems] =useState([])
    useEffect(() => {
        if(orders.length > 0) {
            const li = []
            for(let i = 0; i < orders.length; i++) {
                li.push(i + 1)
            }
            setItems([...li])
        }
    }, [orders])

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
        if(orders.length > 0) {
           for (let i = itemOffset; i < endOffset; i++) {
               if(i < items.length) {
                   paginateItem.push(orders[i])
               }
            } 
        }
        setCurrentItems([...paginateItem])
    }, [itemOffset, endOffset, orders, items])
    console.log(endOffset)

    // クリックしたときにページ移動するために関数
    const handlePageClick = (event) => {
        //event.selected = クリックした番号(0~3), prevの場合は一個前の番号,nextは次の番号
        //newOffset = (クリックした番号 * 1ページに表示するコンテンツの数) / 表示するコンテンツ全部の数　の余り
        const newOffset = event.selected * itemsPerPage
        setItemOffset(newOffset);
    };


    //-------------------------------------------------------

    return (
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {/* 注文した商品の情報をループで表示 */}
                {currentItems.length > 0 && (
                    currentItems.map(order => <OrderHistoryItem key={order.id} order={order} />)
                )}
            </List>
            {currentItems.length > 0 &&(
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
            )}
            
        </section>
    )
}