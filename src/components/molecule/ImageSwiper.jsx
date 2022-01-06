import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/no_image.png";
import 'swiper/css/swiper.css';
import { useState } from "react";

export const ImageSwiper = (props) => {
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
                        <img src={image.path} alt="商品画像" />
                    </div>
                ))
            )}
        </Swiper>
    )
}