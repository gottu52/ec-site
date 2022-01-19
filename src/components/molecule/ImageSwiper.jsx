import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/no_image.png";
import 'swiper/css/swiper.css';
import { useState } from "react";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    image: {
        objectFit: 'cover',
        height: 380,
        width: 300
    }
})


export const ImageSwiper = (props) => {
    const classes = useStyles()

    const [params] = useState({
        pagination: {
            el: 'swiper-pagination',
            type: 'bullets',
            clicckable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: 'swiper-button-prev'
        },
        loop: true
    }) 

    const images = props.images;
    
    return(
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className="p-media__thumb">
                    <img src={NoImage} alt="no_image" />
                </div>
            ) : (
                images.map(image => (
                    <div className="p-media__thunmb" key={image.id}>
                        <img className={classes.image} src={image.path} alt="商品画像" />
                    </div>
                ))
            )}
        </Swiper>
    )
}