import React from 'react';

import ListItems from 'components/ListItems/ListItems';
import 'components/List/List.scss';

const List = (props) => {
    const {data}=props;
    const mappingByListItems=data.map(singleItem=>(
        
        <ListItems 
            backgroundIimage={singleItem.background_image}
            clip={singleItem.clip}
            genres={singleItem.genres}
            id={singleItem.id} 
            key={singleItem.id} 
            name={singleItem.name} 
            shortScreenshots={singleItem.short_screenshots}
        />
    )
        
    )
    return ( 
        <ul className="list">
           {mappingByListItems}
        </ul>
     );
}
 
export default List;