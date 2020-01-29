/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from 'components/Modal/Modal.module.scss';
import playBtn from 'assets/play-button.svg';
import redHeart from 'assets/heartRed.svg';
import * as actionCreators from 'store/actions/actionCreators';

const MODAL_OPEN_CLASS = styles.bodyModalOpen;

class Modal extends Component {
  state = {
    playVideo: false,
  };

  modalRef = this.props.modalRef;

  componentDidMount() {
    document.body.classList.add(MODAL_OPEN_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(MODAL_OPEN_CLASS);
  }

  handlePlayVideo = () => {
    this.setState({
      playVideo: true,
    });
  };

  render() {
    const { playVideo } = this.state;
    const { onClick, addFavGame, modalContent, onHanldeAddGameToFavList } = this.props;

    const selectedGame = modalContent[0];

    const { background_image, clip, id, name, genres } = selectedGame;

    const showGenereofGame = genres.map((type, index) => (
      <span key={type.name}>
        {type.name}
        {genres.length === index + 1 ? null : <span>, </span>}
      </span>
    ));
    return (
      <>
        <div ref={this.modalRef} onClick={onClick} className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <h1 className={styles.modalContent__title}>{name}</h1>

            <div onClick={this.handlePlayVideo} className={styles.modalContent__videoWrapper}>
              {playVideo && clip.clip !== null ? (
                <video className={styles.modalContent__video} autoPlay controls muted>
                  <source src={clip.clip} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className={styles.modalContent__bgVideoWrapper}>
                  <img alt={name} src={background_image} className={styles.modalContent__bgVideo} />
                  <img alt={name} src={playBtn} className={styles.modalContent__playBtn} />
                </div>
              )}
            </div>
            <div>
              <span className={styles.modalContent__genereTitle}>Genere: </span>
              {showGenereofGame}
            </div>
            <Link className={styles.modalContent__ShowMoreBtn} to={`/details/${id}`}>
              Read more...
            </Link>
            <div className={styles.addToFavBtnWrapper}>
              <span>Add to Fav</span>
              <button
                className={styles.addToFavBtn}
                type="button"
                onClick={e => onHanldeAddGameToFavList(e, selectedGame)}
              >
                <img className={styles.addToFavBtn__icon} src={redHeart} alt="heart" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHanldeAddGameToFavList: (e, selectedGame) =>
      dispatch(actionCreators.hanldeAddGameToFavList(e, selectedGame)),
  };
};

export default connect(null, mapDispatchToProps)(Modal);
