import React from 'react';
import 'components/Card/Card.scss'

const Card = (props) => {
    const {                
        backgroundIimage,
        clip,
        genres,
        id,
        name,
        platforms,
        shortScreenshots
    }=props;
    const bgImage={backgroundImage: `url(${backgroundIimage})`};
    
    return ( 
        <div className="card">
            {/* <img className="card__img" src={backgroundIimage} /> */}
            <div style={bgImage} className="card__img"></div>
            <h2 className="card__header">{name}</h2>
            <div>
                {/* <img width="48" src={platforms[1].platform.image_background} /> */}
            </div>
        </div>
     );
}
 
export default Card;