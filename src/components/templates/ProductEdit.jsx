import React , {useCallback, useEffect, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import { useDispatch } from "react-redux";
import { SelectBox } from "../attom/SelectBox";
import { saveProduct } from "../../redux/products/operations";
import { ImageArea } from "../molecule/ImageArea";
import { db } from "../../firebase";
import SetSizesArea from "../molecule/SetSizeArea";

export const ProductEdit = () => {
    const dispatch = useDispatch();

    //URLからidを取得
    //(idからデータを取得し、既存商品の編集の場合は編集前のデータを反映)
    let id = window.location.pathname.split("/productEdit")[1];
    if(id !== "") {
        id = id.split('/')[1]
    }

    //useState(入力欄)
    const [ name, setName ] = useState(""),
        [ description, setDescription ] = useState(""),
        [ category, setCategory ] = useState(""),
        [ categories, setCategories ] = useState([]),
        [ gender, setGender ] = useState(""),
        [ price, setPrice ] = useState(""),
        [ images, setImages ] = useState([]),
        [ sizes, setSizes ] = useState([]);

    //inputのonChange
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])
    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])
    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    //selectBox内でループするデータ(option)
    //(カテゴリーと違い、追加は考えない)
    const genders = [
        { id: "all", name: "全て" },
        { id: "male", name: "メンズ" },
        { id: "female", name: "レディース" },
    ]

    //productsコレクションからデータを取ってくる
    //(既存商品の編集の場合は編集前のデータを反映する)
    useEffect(() => {
        if(id !== "") {
            db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    setName(data.name);
                    setDescription(data.description);
                    setCategory(data.category);
                    setGender(data.gender);
                    setPrice(data.price);
                    setImages(data.images);
                })
        }
    }, [id])

    //カテゴリーのセレクトボックスに入るデータを取ってくる
    //(firestoreにデータが追加されるたびに選択肢も追加できるように)
    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push({
                        id: data.id,
                        name: data.name
                    })
                })
                setCategories(list)    
            })
    }, [])


    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">商品の登録、追加</h2>
            {/* 画像エリア */}
            <ImageArea images={images} setImages={setImages}/>
            <div className="module-spacer--medium" />
            {/* 商品名 */}
            <TextInput 
                fullWidth={true} label={"商品名"} multiline={false} required={true}
                rows={1} value={name} type={"text"} onChange={inputName}
            />
            {/* 商品説明 */}
            <TextInput 
                fullWidth={true} label={"商品説明"} multiline={true} required={true}
                rows={5} value={description} type={"text"} onChange={inputDescription}
            />
            {/* カテゴリー */}
            {/* optionにはオブジェクトの配列が入る(idとname) */}
            <SelectBox
                label={'カテゴリー'} required={true} value={category} 
                select={setCategory} option={categories}
            />
            {/* 性別 */}
            <SelectBox
                label={'性別'} required={true} value={gender} 
                select={setGender} option={genders}
            />
            {/* 価格 */}
            <TextInput 
                fullWidth={true} label={"価格"} multiline={false} required={true}
                rows={1} value={price} type={"number"} onChange={inputPrice}
            />
            <div className="module-spacer--small" />
            {/* サイズと数量 */}
            <SetSizesArea sizes={sizes} setSizes={setSizes} />
            <div className="module-spacer--small" />
            {/* 保存ボタン */}
            <div className="center">
                <PrimaryButton 
                    label={"商品情報を保存"} 
                    onClick={() => dispatch(saveProduct(name, description, category, gender, price, images, id, sizes))}
                />
            </div>
        </div>
    )
}