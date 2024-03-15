import React, { useCallback } from "react";
import styles from "./profile-tab.module.css";

interface ProfileTabProps {
  value: any;
  isActive: boolean;
  onClick: (value: any) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  children,
  value,
  isActive,
  onClick,
}) => {
  const className = `${styles.tab} ${isActive ? styles.tab_type_current : ""}`;

  const handleClick = useCallback(() => {
    if (typeof onClick === "function" && !isActive) {
      onClick(value);
    }
  }, [onClick, value, isActive]);

  return (
    <div
      className={`${className} pt-4 pr-10 pb-4 noselect`}
      onClick={handleClick}
    >
      <span className="text text_type_main-medium">{children}</span>
    </div>
  );
};

export default ProfileTab;
