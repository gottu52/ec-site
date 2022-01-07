import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";


export const HeaderMenu = (props) => {
    return(
        <>
            <IconButton>
                <Badge badgeContent={3} color="secondary">
                   <ShoppingCart /> 
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton onClick={(event) => props.onClick(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}