import React, {Component} from 'react';
import {Link} from "react-router-dom";


import styles from 'components/Modal/Modal.module.scss';
import playBtn from 'assets/play-button.svg'


const MODAL_OPEN_CLASS = styles.bodyModalOpen;

class Modal  extends Component {
      state = { 
        showModal: true,
        playVideo: false
    }

    modalRef=this.props.modalRef;

    componentDidMount(){
        document.body.classList.add(MODAL_OPEN_CLASS);

    }

    componentWillUnmount() {

        document.body.classList.remove(MODAL_OPEN_CLASS);
    }


    handlePlayVideo = () =>{
        this.setState({
            playVideo: true
        })
    }


     


    render() { 
        const{onClick, addFavGame}=this.props;
        
        const selectedGame=this.props.modalContent[0];

        const { background_image,clip, id, name, genres }=selectedGame;

        const showGenereofGame=genres.map((type)=>(
            <span>{type.name}</span>
        ))
        return (   
            <>
                <div ref={this.modalRef} onClick={onClick}  className={styles.modalWrapper}>
                    <div className={styles.modalContent}>
                    <span className={styles.modalContent__CloseBtn}  ref={this.modalRef}>&#215;</span>

                        <h1>{name}</h1>
                        <div onClick={this.handlePlayVideo} className={styles.modalContent__videoWrapper}>
                            {
                                this.state.playVideo
                            ?
                            <video  className={styles.modalContent__video} 
                                autoPlay 
                                controls
                                muted
                            >
                                <source src={clip.clip} type="video/mp4" ></source>
                                Your browser does not support the video tag.
                            </video>
                            :
                            <div className={styles.modalContent__bgVideoWrapper}>
                            <img src={background_image} className={styles.modalContent__bgVideo} />
                            <img src={playBtn} className={styles.modalContent__playBtn} />
                            </div>
                            }

                            {/* select video depending on the resolution */}

                        </div>

                        <div>
                            <span>Genere:</span>
                            {showGenereofGame}
                        </div>
                        


                        <Link className={styles.modalContent__ShowMoreBtn} target="_blank" to={`/details/${id}`}>Read more...</Link>
                        <div>
                            <button onClick={(e, selectedGame)=>addFavGame(e, this.props.modalContent[0])}>Add to Your Fav List!</button>
                        </div>
                    </div>
                </div> 
            </>
        );
    }
}
 
export default Modal;