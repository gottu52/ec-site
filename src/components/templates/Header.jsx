import {makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import logo from "../../assets/img/logo.png";
import { getIsSignedIn } from "../../redux/users/selector";
import { HeaderMenu } from "../molecule/HeaderMenu";


const useStyles = makeStyles({
    root: {
        flexGlow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%",
    },
    logo: {
        cursor: "pointer",
    },
    iconButtons: {
        margin: "0 0 0 auto",
    }
})

export const Header = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);
    const dispatch = useDispatch()

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img 
                        src={logo} alt="logo" className={classes.logo} width="128px"
                        onClick={() => dispatch(push('/'))}
                    />
                    {isSignedIn && (
                    <div className={classes.iconButtons}>
                        <HeaderMenu />
                    </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}