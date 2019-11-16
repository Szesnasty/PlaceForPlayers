import React from 'react';
import {
    Link
  } from "react-router-dom";

import Card from 'components/Card/Card';
import Modal from 'components/Modal/Modal';

import 'components/ListItems/ListItems.scss';

const ListItems = (props) => {
    const {
        backgroundImage,
        clip,
        genres,
        id,
        name,
        onClick,
        platforms,
        shortScreenshots
    }=props;
    return (
        <>

            <li  onClick={(e)=>onClick(id)} className="listItem">
                {/* <Link target="_blank" to={`/details/${id}`}> */}
                    <Card 
                        backgroundImage={backgroundImage}
                        clip={clip}
                        genres={genres}
                        id={id} 
                        name={name} 
                        platforms={platforms}
                        shortScreenshots={shortScreenshots}
                    />
                {/* </Link> */}
            </li>
        </>
     );
}
 
export default ListItems;