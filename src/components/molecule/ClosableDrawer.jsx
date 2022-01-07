import Drawer from "@material-ui/core/Drawer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import Historyicon from "@material-ui/icons/History";
// import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../attom/TextInput';
import { useCallback, useState } from "react";


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

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword])

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
                <div>
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
                        <ListItem button key="logout" >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"logout"} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}