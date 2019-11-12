import React, {Component} from 'react';
import {Link} from "react-router-dom";


import styles from 'components/Modal/Modal.module.scss';


const MODAL_OPEN_CLASS = styles.bodyModalOpen;

class Modal  extends Component {
      state = { 
        showModal: true,
    }

    modalRef=this.props.modalRef;

    componentDidMount(){
        document.body.classList.add(MODAL_OPEN_CLASS);

    }

    componentWillUnmount() {

        document.body.classList.remove(MODAL_OPEN_CLASS);
    }



    render() { 
        const{onClick}=this.props;
        const { id,name }=this.props.modalContent[0];
        return (   
            <>
                <div ref={this.modalRef} onClick={onClick}  className={styles.modalWrapper}>
                    <div className={styles.modalContent}>
                    <span className={styles.modalContent__CloseBtn}  ref={this.modalRef}>&#215;</span>
                        <h1>{name}</h1>
                        <div>You may also like:
                            <span></span>
                        </div>
                        <Link target="_blank" to={`/details/${id}`}>Read more...</Link>
                    </div>
                </div> 
            </>
        );
    }
}
 
export default Modal;