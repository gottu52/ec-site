import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";

const productsRef = db.collection('products');

export const saveProduct = (name, description, category, gender, price) => {
    const timestamp = FirebaseTimestamp.now()
    return async(dispatch) => {
        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: price,
            updated_at: timestamp,
        }
        
        const ref = productsRef.doc();
        const id = ref.id;
        data.id = id;
        data.created_at = timestamp;

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}