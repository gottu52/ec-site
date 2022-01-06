import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { fetchProductsAction } from "./actions";

const productsRef = db.collection('products');

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

//商品情報の登録
export const saveProduct = (name, description, category, gender, price, images, id) => {
    const timestamp = FirebaseTimestamp.now()
    return async(dispatch) => {
        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: price,
            images: images,
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