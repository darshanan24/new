import React from 'react';

import './Modal.css';
import Aux from '../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className="Modal"
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <div className="modal-header">HEADING</div>
      <div className="modal-content">{props.children}</div>
    </div>
  </Aux>
);

export default Modal;
