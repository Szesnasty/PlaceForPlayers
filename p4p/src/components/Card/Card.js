import React from 'react';
import 'components/Card/Card.scss'

const Card = (props) => {
    const {                
        backgroundImage,
        clip,
        genres,
        id,
        name,
        platforms,
        shortScreenshots
    }=props;

    // let bgAfterCrop=backgroundImage.replace("media/", "media/crop/600/400/");
    let bgAfterCrop=backgroundImage;

    {bgAfterCrop ===null ? bgAfterCrop="" : bgAfterCrop=backgroundImage.replace("media/", "media/crop/600/400/")}

    const bgImage={backgroundImage: `url(${bgAfterCrop})`};
 
    return ( 
        <div className="card">
            {/* <img className="card__img" src={backgroundImage} /> */}
            <div style={bgImage} className="card__img"></div>
            <h2 className="card__header">{name}</h2>
            <div>
                {/* <img width="48" src={platforms[1].platform.image_background} /> */}
                
            </div>
        </div>
     );
}
 
export default Card;