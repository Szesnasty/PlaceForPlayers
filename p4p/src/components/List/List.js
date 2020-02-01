import React from 'react';

import ListItems from 'components/ListItems/ListItems';
import 'components/List/List.scss';

const List = props => {
  const { data, handleDeleteGameFromFavList, onClick, wayOfDisplayingDetails } = props;

  const mappingByListItems = data.map(singleItem => (
    <ListItems
      backgroundImage={singleItem.background_image}
      clip={singleItem.clip}
      genres={singleItem.genres}
      id={singleItem.id}
      key={`${singleItem.id}-${new Date().getTime()}`}
      name={singleItem.name}
      platforms={singleItem.platforms}
      shortScreenshots={singleItem.short_screenshots}
      onClick={e => onClick(e)}
      wayOfDisplayingDetails={wayOfDisplayingDetails}
      handleDeleteGameFromFavList={handleDeleteGameFromFavList}
      released={singleItem.released}
    />
  ));
  return (
    <ul className="list">
      {data.length > 0 ? (
        mappingByListItems
      ) : (
        <h2 className="list__msg">
          Nothing here yet... You can add your favorite games to this list
        </h2>
      )}
    </ul>
  );
};

export default List;
