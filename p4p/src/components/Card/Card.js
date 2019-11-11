import React from 'react';
import 'components/Card/Card.scss'

const Card = (props) => {
    const {                
        backgroundIimage,
        clip,
        genres,
        id,
        name,
        shortScreenshots
    }=props;
    return ( 
        <div className="card">
            <img className="card__img" src={backgroundIimage} />
            <h2>{name}</h2>
            
        </div>
     );
}
 
export default Card;