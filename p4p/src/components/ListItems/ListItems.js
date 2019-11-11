import React from 'react';
import {
    Link
  } from "react-router-dom";

import Card from 'components/Card/Card'

import 'components/ListItems/ListItems.scss'

const ListItems = (props) => {
    const {
        backgroundIimage,
        clip,
        genres,
        id,
        name,
        shortScreenshots
    }=props;
    return ( 
        <li className="listItem">
            <Link target="_blank" to={`/details/${id}`}>
                <Card 
                    backgroundIimage={backgroundIimage}
                    clip={clip}
                    genres={genres}
                    id={id} 
                    name={name} 
                    shortScreenshots={shortScreenshots}
                />
            </Link>
        </li>
     );
}
 
export default ListItems;