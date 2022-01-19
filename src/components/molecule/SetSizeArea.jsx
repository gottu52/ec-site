import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../attom/TextInput";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    inputText: {
        marginLeft: '20px'
    },
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SetSizesArea = (props) => {
    const classes = useStyles();

    //useState
    //indexは追加されたデータの数(size,quantity)
    const [index, setIndex] = useState(0),
        [size, setSize] = useState(""),
        [quantity, setQuantity] = useState(0);

    //inputのonChange
    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);
    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    //サイズ、数量の追加関数
    const addSize = (index, size, quantity) => {
        if(size === "" || quantity === "" || quantity === 0) {
            //Required input is blank
            return false
        } else {
            // 新規作成の場合
            if(index === props.sizes.length) {
                //sizesにデータをセット
                props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}])
                //indexに＋１
                setIndex(index + 1)
                //入力欄をリセット
                setSize("")
                setQuantity(0)   
            //既存データの修正の場合
            } else {
                //index番目のデータをsizesにセット
                const newSizes = props.sizes
                newSizes[index] = {size: size, quantity: quantity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                // 入力欄をリセット
                setSize("")
                setQuantity(0)
            }
        }
    }

    //サイズ、数量の編集関数
    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    // サイズ、数量の削除
    //削除の際はfilterをかけ、削除しないデータをすべて取得してsetする
    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, i) => i !== deleteIndex)
        props.setSizes(newSizes)
    }

    //sizesの個数が変わったらこういう風に変更してねっ
    useEffect(() => {
        setIndex(props.sizes.length)
    }, [props.sizes.length])

    return (
        <div aria-label="サイズ展開">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    {/* テーブルヘッド */}
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    {/* テーブルボディ */}
                    {/* sizesが追加されたら表示 */}
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    {/* サイズ */}
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
                                    {/* 数量 */}
                                    <TableCell>{item.quantity}</TableCell>
                                    {/* 編集ボタン */}
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(index, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    {/* 削除ボタン */}
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {/* input */}
                <div className={classes.inputText}>
                    <TextInput
                        fullWidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={"text"}
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={"number"}
                    />
                </div>
                {/* サイズ、数量の追加ボタン */}
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small"/>
        </div>
    );
};

export default SetSizesArea;
