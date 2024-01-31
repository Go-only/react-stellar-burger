import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector("#modals");

export const Modal = ({ title, onClose, children }) => {

  function handleCloseModal(data) {
    onClose(data)
}

  return createPortal(
    (
      <>
        <div className={styles.modal}>
          <div className={`${styles.header} pt-10 pr-10 ml-10`}>
            <p className="text text_type_main-large">{title}</p>
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