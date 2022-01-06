import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { makeStyles, Typography } from '@material-ui/core';
import NoImage from "../../assets/img/no_image.png";
import {push} from "connected-react-router";
import { useDispatch } from 'react-redux';

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
            </CardContent>
        </Card>
    )
}