import React from 'react';

import ListItems from 'components/ListItems/ListItems';

import 'components/List/List.scss';

const List = (props) => {
    const {data, onClick, isModal, wayOfDisplayingDetails}=props;
    const mappingByListItems=data.map(singleItem=>(
        



        <ListItems 
            backgroundImage={singleItem.background_image}
            clip={singleItem.clip}
            genres={singleItem.genres}
            id={singleItem.id} 
            isModal={isModal}
            key={`${singleItem.id}-${new Date().getTime()}`} 
            name={singleItem.name} 
            platforms={singleItem.platforms}
            shortScreenshots={singleItem.short_screenshots}
            onClick={(e)=>onClick(e)}
            wayOfDisplayingDetails={wayOfDisplayingDetails}
        />


        
       
    )
        
    )
    return ( 
    
        <ul  className="list">
           {mappingByListItems}
            
           
        </ul>
     );
}
 
export default List;