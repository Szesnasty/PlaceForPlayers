import React from 'react';

import styles from 'components/Card/Card.module.scss';
import { Link } from 'react-router-dom';

const Card = props => {
  const {
    backgroundImage,
    id,
    name,
    onClick,
    wayOfDisplayingDetails,
    handleDeleteGameFromFavList,
    released,
  } = props;

  let bgAfterCrop = backgroundImage;

  if (backgroundImage === null) {
    bgAfterCrop = '';
  } else {
    bgAfterCrop = backgroundImage.replace('media/', 'media/crop/600/400/');
  }

  const bgImage = { backgroundImage: `url(${bgAfterCrop})` };

  if (wayOfDisplayingDetails === 'modal') {
    return (
      <>
        <div style={bgImage} onClick={() => onClick(id)} className={styles.card}>
          <header className={styles.card__header}>
            <h2 className={styles.card__title}>{name}</h2>
            <h3 className={styles.card__subtitle}>Release date: {released}</h3>
          </header>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={bgImage} className={styles.card}>
        <header className={styles.card__header}>
          <h2 className={styles.card__title}>{name}</h2>
          <h3 className={styles.card__subtitle}>Release date: {released}</h3>
        </header>
        <button type="button">
          <Link to={`/details/${id}`}>Show more details</Link>
        </button>
        <button onClick={() => handleDeleteGameFromFavList(id)} type="button">
          Usuń z ulubionych
        </button>
      </div>
    </>
  );
};

export default Card;
