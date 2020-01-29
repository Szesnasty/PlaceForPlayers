import React from 'react';

import Card from 'components/Card/Card';
import styles from 'components/ListItems/ListItems.module.scss';

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
    released,
  } = props;
  return (
    <>
      <li className={styles.listItem}>
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
          released={released}
        />
      </li>
    </>
  );
};

export default ListItems;
