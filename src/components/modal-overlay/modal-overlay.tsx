import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface ModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
