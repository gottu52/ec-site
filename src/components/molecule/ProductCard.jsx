import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NoImage from "../../assets/img/no_image.png";
import {push} from "connected-react-router";
import { useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MOreVertIcon from '@material-ui/icons/MoreVert';
import { deleteProducts } from '../../redux/products/operations';

const useStyle  = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: "calc(50% - 16px)"
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16,
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary.main,
        fontSize: 16
    }
}))

export const ProductCard = (props) => {
    const dispatch = useDispatch();
    const price = props.price.toLocaleString();
    const classes = useStyle();
    const images = (props.images.length > 0 ? props.images : [{path: NoImage}])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return(
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={images[0].path} 
                title=""
                onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/' + props.id))} >
                   <Typography color="textSecondary" compenent="p">
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component="p">
                        ¥{price}
                    </Typography> 
                </div>
                <IconButton onClick={handleClick} >
                    <MOreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            dispatch(push('productEdit/' + props.id))
                            handleClose()
                        }}
                    >
                        編集する
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(deleteProducts(props.id))
                            handleClose()
                        }}
                    >
                        削除する
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}