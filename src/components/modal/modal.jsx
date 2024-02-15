import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector("#modals");

export const Modal = ({ title, onClose, children }) => {


  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        onClose();
      }
    }
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }

  }, []) 


  return createPortal(
    (
      <>
        <div className={styles.modal}>
          <div className={`${styles.header} pt-10 pr-10 ml-10`}>
            <p className="text text_type_main-large">{title}</p>
            <CloseIcon onClick={onClose} />
          </div>
          {children}
        </div>
        <ModalOverlay onClick={onClose} />
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  titleFormIngredient: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};