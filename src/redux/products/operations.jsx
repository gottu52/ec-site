import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";

const productsRef = db.collection('products');

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
            const id = ref.id;
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