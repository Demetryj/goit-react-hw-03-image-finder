import { Component } from 'react';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.props.onCloseModal();
      }
    });
  }

  componentWillUnmount() {
    const handleKeyDown = event => {
      this.props.onCloseModal();
    };
    window.removeEventListener('keydown', handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
