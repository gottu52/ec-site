import Drawer from "@material-ui/core/Drawer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../attom/TextInput';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { signOut } from "../../redux/users/operations";
import { db } from "../../firebase";


const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0
        }
    },
    toolBar: theme.mixins.toolBar,
    drowerPaper: {
        width: 256
    },
    serchField: {
        alignItems: "center",
        display: 'flex',
        marginLeft: 32
    }
}))



export const ClosableDrawer = (props) => {
    const dispatch = useDispatch();    
    const classes = useStyles()
    //入力欄のuseState
    const [keyword, setKeyword] = useState('');
    //入力欄のonChange
    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword])

    //メニューをクリックしたときの処理(ページ遷移してメニューを閉じる)
    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event, false)
    }

    //配列をループで回して一覧を表示
    const menus = [
        {
            func: selectMenu, 
            label:"商品登録", 
            icon:  <AddCircleIcon />, 
            id: "register",
            value: "/productEdit"
        },
        {
            func: selectMenu, 
            label:"注文履歴", 
            icon:  <HistoryIcon />, 
            id: "history",
            value: "/order/history"
        },
        {
            func: selectMenu, 
            label:"プロフィール", 
            icon:  <PersonIcon />, 
            id: "profile",
            value: "/user/mypage"
        },
    ];

    //検索フィルター
    const [filters, setFilters] = useState([
        { func: selectMenu, label:"すべて", id: "all", value: "/" },
        { func: selectMenu, label:"メンズ", id: "male", value: "/?gender=male" },
        { func: selectMenu, label:"レディース", id: "female", value: "/?gender=female" },
    ])

    //componentDidMountでfirestoreからカテゴリーのデータを持ってくる
    useEffect(() => [
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push({
                        func: selectMenu,
                        label: data.name,
                        id: data.id,
                        value: `/?category=${data.id}`
                    })
                })
                //filterにセット
                setFilters(prevState => [...prevState, ...list])
            })
    ], [])

    return(
        <nav className={classes.drawer}>
            <Drawer
                container={props.container}
                variant="temporary"
                anchor='right'
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(e) => props.onClose(e)}
                    onKeyDown={(e) => props.onClose(e)}
                >
                    {/* 検索項目 */}
                    <div className={classes.serchField}>
                        <TextInput
                            fullWidth={false}
                            label={"キーワードを入力"}
                            multiline={false}
                            onChange={inputKeyword}
                            required={false}
                            rows={1}
                            valuse={keyword}
                            type="text"
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {/* メニューリスト */}
                    <List>
                        {/* メニュー一覧 */}
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        {/* ログアウト */}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())} >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"ログアウト"} />
                        </ListItem>
                    </List>
                    {/* カテゴリーリスト */}
                    <List>
                        {filters.map(filter => (
                            <ListItem 
                                button 
                                key={filter.id}
                                onClick={(e) => filter.func(e, filter.value)}    
                            >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}