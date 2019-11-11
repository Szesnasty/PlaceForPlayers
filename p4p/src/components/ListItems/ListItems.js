import React from 'react';
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
            <Card 
                backgroundIimage={backgroundIimage}
                clip={clip}
                genres={genres}
                id={id} 
                name={name} 
                shortScreenshots={shortScreenshots}
            />
        </li>
     );
}
 
export default ListItems;