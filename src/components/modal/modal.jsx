import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modals");

export const Modal = ({ titleFormIngredient, onClose, children }) => {

  function handleCloseModal(data) {
    onClose(data)
}

  return createPortal(
    (
      <>
        <div className={styles.modal}>
          <div className={`${styles.header} pt-10 pr-10 ml-10`}>
            <p className="text text_type_main-large">{titleFormIngredient}</p>
            <CloseIcon onClick={handleCloseModal} />
          </div>
          {children}
        </div>
        <ModalOverlay onClick={handleCloseModal} />
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  titleFormIngredient: PropTypes.string, // или любой другой подходящий тип
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};