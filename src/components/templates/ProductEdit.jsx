import React , {useCallback, useState} from "react";
import {TextInput} from "../attom/TextInput";
import {PrimaryButton} from "../attom/PrimaryButton";
import { useDispatch } from "react-redux";
import { SelectBox } from "../attom/SelectBox";
import { saveProduct } from "../../redux/products/operations";

export const ProductEdit = () => {
    const dispatch = useDispatch();

    const [ name, setName ] = useState(""),
        [ description, setDescription ] = useState(""),
        [ category, setCategory ] = useState(""),
        [ gender, setGender ] = useState(""),
        [ price, setPrice ] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])
    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])
    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        { id: "tops", name: "トップス" },
        { id: "shirts", name: "シャツ" },
        { id: "pants", name: "パンツ" },
    ]
    const genders = [
        { id: "all", name: "全て" },
        { id: "man", name: "メンズ" },
        { id: "lady", name: "レディース" },
    ]

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">商品の登録、追加</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"商品名"} multiline={false} required={true}
                rows={1} value={name} type={"text"} onChange={inputName}
            />
            <TextInput 
                fullWidth={true} label={"商品説明"} multiline={true} required={true}
                rows={5} value={description} type={"text"} onChange={inputDescription}
            />
            <SelectBox
                label={'カテゴリー'} required={true} value={category} 
                select={setCategory} option={categories}
            />
            <SelectBox
                label={'性別'} required={true} value={gender} 
                select={setGender} option={genders}
            />
            <TextInput 
                fullWidth={true} label={"価格"} multiline={false} required={true}
                rows={1} value={price} type={"text"} onChange={inputPrice}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton 
                    label={"商品情報を保存"} 
                    onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
                />
            </div>
        </div>
    )
}