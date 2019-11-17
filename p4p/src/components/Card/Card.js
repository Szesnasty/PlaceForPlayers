import React from 'react';
import 'components/Card/Card.scss';
import {
    Link
  } from "react-router-dom";


const Card = (props) => {
    const {                
        backgroundImage,
        clip,
        genres,
        id,
        name,
        platforms,
        shortScreenshots,
        onClick,
        wayOfDisplayingDetails
    }=props;

    // let bgAfterCrop=backgroundImage.replace("media/", "media/crop/600/400/");
    let bgAfterCrop=backgroundImage;

    {bgAfterCrop ===null ? bgAfterCrop="" : bgAfterCrop=backgroundImage.replace("media/", "media/crop/600/400/")}

    const bgImage={backgroundImage: `url(${bgAfterCrop})`};
 
    if(wayOfDisplayingDetails==="modal"){
        return ( 
            <>
            <div onClick={(e)=>onClick(id)} className="card">
                {/* <img className="card__img" src={backgroundImage} /> */}
                <div style={bgImage} className="card__img"></div>
                <h2 className="card__header">{name}</h2>
            </div>
            </>
         );
    }else{
        return ( 
            <>
            <div className="card">
                {/* <img className="card__img" src={backgroundImage} /> */}
                <div style={bgImage} className="card__img"></div>
                <h2 className="card__header">{name}</h2>
                <button><Link to={`/details/${id}`}>Sow more details</Link></button>
            </div>
            </>
         );
    }


}
 
export default Card;