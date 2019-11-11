import React, {Component} from 'react';
import {Link} from "react-router-dom";

import 'components/Modal/Modal.scss'


const MODAL_OPEN_CLASS = "body--modal-open";

class Modal  extends Component {
      state = { 
        // id: this.props.match.params.id,
        showModal: true,
    }

    modalRef=this.props.modalRef;
    // handleCloseModal=(e)=>this.props.handleCloseModal(e);

     
    componentDidMount(){
        document.body.classList.add(MODAL_OPEN_CLASS);

    }

    componentWillUnmount() {

        document.body.classList.remove(MODAL_OPEN_CLASS);
    }



    render() { 
        console.log(this.props)
        return (   
    <>
            <div ref={this.modalRef} onClick={e=>this.props.onClick(e)}  className="modal-wrapper">
                
                <div   className="modal-content">
                    <h1>{this.props.modalContent[0].name}</h1>
                    
                    
                    <div>You may also like:
                        <span></span>
                    </div>
                    <Link target="_blank" to={`/details/${this.props.modalContent[0].id}`}>Read more...</Link>
                </div>

                
            </div> 
            </>
        );
    }
}
 
export default Modal;