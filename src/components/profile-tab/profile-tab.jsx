import { useCallback } from "react";
import styles from "./profile-tab.module.css";

const ProfileTab = ({ children, value, isActive, onClick: handleClick }) => {
  const className = `${styles.tab} ${isActive ? styles.tab_type_current : ""}`;

  const onClick = useCallback(() => {
    console.log(isActive);
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

export default ProfileTab;
