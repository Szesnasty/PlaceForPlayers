import React from 'react';

import Card from 'components/Card/Card';

import 'components/ListItems/ListItems.scss';

const ListItems = props => {
  const {
    backgroundImage,
    clip,
    genres,
    id,
    name,
    onClick,
    platforms,
    shortScreenshots,
    wayOfDisplayingDetails,
    handleDeleteGameFromFavList,
  } = props;
  return (
    <>
      <li className="listItem">
        {/* <Link target="_blank" to={`/details/${id}`}> */}
        <Card
          backgroundImage={backgroundImage}
          clip={clip}
          genres={genres}
          id={id}
          name={name}
          platforms={platforms}
          shortScreenshots={shortScreenshots}
          onClick={onClick}
          wayOfDisplayingDetails={wayOfDisplayingDetails}
          handleDeleteGameFromFavList={handleDeleteGameFromFavList}
        />
        {/* </Link> */}
      </li>
    </>
  );
};

export default ListItems;
