import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { PropsWithChildren, useEffect } from "react";

const modalRoot = document.querySelector("#modals");

interface ModalProps {
  onClose: () => void;
}

export const Modal = ({ onClose, children }: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.header} pt-10 pr-10 ml-10`}>
          <p className="text text_type_main-large"></p>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
