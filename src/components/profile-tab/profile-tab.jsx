import { useCallback } from "react";
import styles from "./profile-tab.module.css";
import PropTypes from 'prop-types';

const ProfileTab = ({ children, value, isActive, onClick: handleClick }) => {
  const className = `${styles.tab} ${isActive ? styles.tab_type_current : ""}`;

  const onClick = useCallback(() => {
    if (typeof handleClick === "function" && !isActive) {
      handleClick(value);
    }
  }, [handleClick, value, isActive]);

  return (
    <div className={`${className} pt-4 pr-10 pb-4 noselect`} onClick={onClick}>
      <span className="text text_type_main-medium">{children}</span>
    </div>
  );
};

ProfileTab.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default ProfileTab;


