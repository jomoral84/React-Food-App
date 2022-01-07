import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';




const BackDrop = (props) => {
    return (
        <div className={classes.backdrop}>
            
        </div>
    )
}

const portalElements = document.getElementById('overlays');

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
           <div className={classes.content}>{props.children}</div> 
        </div>
    )
}


const Modal = (props) => {
    return <Fragment>
            {ReactDOM.createPortal(<BackDrop/>, portalElements)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElements)}
        
        </Fragment>
    
}


export default Modal;
