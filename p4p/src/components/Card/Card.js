import React from 'react';
import 'components/Card/Card.scss';
import { Link } from 'react-router-dom';

const Card = props => {
  const {
    backgroundImage,
    id,
    name,
    onClick,
    wayOfDisplayingDetails,
    handleDeleteGameFromFavList,
  } = props;

  // let bgAfterCrop=backgroundImage.replace("media/", "media/crop/600/400/");
  let bgAfterCrop = backgroundImage;

  if (bgAfterCrop === null) {
    bgAfterCrop = '';
  } else {
    bgAfterCrop = backgroundImage.replace('media/', 'media/crop/600/400/');
  }

  const bgImage = { backgroundImage: `url(${bgAfterCrop})` };

  if (wayOfDisplayingDetails === 'modal') {
    return (
      <>
        <div onClick={() => onClick(id)} className="card">
          {/* <img className="card__img" src={backgroundImage} /> */}
          <div style={bgImage} className="card__img" />
          <h2 className="card__header">{name}</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="card">
        {/* <img className="card__img" src={backgroundImage} /> */}
        <div style={bgImage} className="card__img" />
        <h2 className="card__header">{name}</h2>
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
