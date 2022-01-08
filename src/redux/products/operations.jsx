import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { deleteProductsAction, fetchProductsAction } from "./actions";

const productsRef = db.collection('products');

//商品情報を随時取得
export const fetchProducts = () => {
    return async(dispatch) => {
        //更新が新しい順にソート（昇順）して。get
        productsRef.orderBy('updated_at', 'desc').get()
            .then(snapshot => {
                const productsList = [];
                snapshot.forEach(snapshot => {
                    const product = snapshot.data()
                    productsList.push(product)
                })
                dispatch(fetchProductsAction(productsList))
            })
    }
}

//商品の注文(トランザクション)
export const orderProducts = (productsInCart, amount) => {
    return async(dispatch, getState) => {
        //usersのドキュメントを指定
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid)
        //現在時刻取得
        const timestamp = FirebaseTimestamp.now()

        //注文履歴のための商品データを入れる空配列
        let products = [],
            //打ち切れた商品を入れる空配列
            soldOutProducts = []

        //トランザクションのバッチ
        const batch = db.batch()

        //カート内の商品情報(users)でループ
        for (const product of productsInCart) {
            //Idが一致する商品情報(products)をゲットし、sizes(quantityとsize)を定数に入れる
            const snapshot = await productsRef.doc(product.productId).get()
            const sizes = snapshot.data().sizes;
            
            //商品の個数の調整、売り切れ商品の摘出
            const updatedSizes = sizes.map(size => {
                //product(products)とcart(users)のsizeが一致するなら
                if(size.size === product.size) {
                    //quantityが0なら売り切れ商品に入れる
                    if(size.quantity === 0) {
                        soldOutProducts.push(product.name)
                        return size
                    }
                    //objectでsizeとquantityを返す
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            })

            //注文履歴用の商品データ
            products.push({
                id: product.productId,
                images: product.images,
                price: product.price,
                size: product.size
            });

            //バッチ
            batch.update(
                //商品の個数等をアップデート
                productsRef.doc(product.productId),
                {sizes: updatedSizes}
            )
            batch.delete(
                //カートのリセット
                userRef.collection('cart').doc(product.cartId)
            )

            //売り切れ商品がカート内にあった場合の処理
            if (soldOutProducts.length > 0) {
                const errorMessage = (soldOutProducts.length > 1) ? 
                    //売り切れ商品が２個以上なら、間に「と」を入れて文字列をくっつける
                    soldOutProducts.join('と') :
                    soldOutProducts[0]
                alert('大変申し訳ありません。' + errorMessage + "が在庫切れとなったため、注文処理を中断しました。")
            } else {
                //注文履歴の作成
                batch.commit()
                    .then(() => {
                        //保存するドキュメントの取得(users)、発送日のデータの生成
                        const orderRef = userRef.collection('orders').doc();
                        const date = timestamp.toDate();
                        const shippingDate =  FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

                        //注文履歴のデータ
                        const history = {
                            amount: amount,
                            created_at: timestamp,
                            id: orderRef.id,
                            products: products,
                            shipping_date: shippingDate,
                            updated_at: timestamp
                        }

                        //ドキュメントにデータを追加し、ページ遷移
                        orderRef.set(history)
                        dispatch(push('/order/complete'))

                    }).catch(() => {
                        alert('注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。')
                        return false
                    })
            }
        }

    }
}

//商品情報の登録
export const saveProduct = (name, description, category, gender, price, images, id, sizes) => {
    const timestamp = FirebaseTimestamp.now()
    return async(dispatch) => {
        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: parseInt(price, 10),
            images: images,
            sizes: sizes,
            updated_at: timestamp,
        }
        
        if(id === "") {
           const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp; 
        }
        
        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}

//商品情報の削除
export const deleteProducts = (id) => {
    return async(dispatch, getState) => {
        productsRef.doc(id).delete()
        .then(() => {
            const prevProducts = getState().products.list;
            const nextProducts = prevProducts.filter(product => product.id !== id)
            dispatch(deleteProductsAction(nextProducts))
        })
    }
}
