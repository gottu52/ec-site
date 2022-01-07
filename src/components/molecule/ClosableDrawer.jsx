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
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { signOut } from "../../redux/users/operations";


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
    const classes = useStyles()
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword])

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

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

    return(
        <nav className={classes.drawer}>
            <Drawer
                container={props.container}
                variant="temporary"
                anchor='right'
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(e) => props.onClose(e)}
                    onKeyDown={(e) => props.onClose(e)}
                >
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
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())} >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"ログアウト"} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}