import { useState } from "react";
import styles from "./profile-menu.module.css";
import ProfileTab from "../profile-tab/profile-tab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/slices/user/userSlice";

export const ProfileMenu = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [currentTab] = useState(activeTab);
  const history = useHistory();

  const handleTabClick = (value) => {
    if (value === "profile") {
      history.replace({ pathname: "/profile" });
    }

    if (value === "orderHistory") {
      history.replace({ pathname: "/profile/orders" });
    }

    if (value === "logOut") {
      dispatch(logoutUser());
      history.push("/");
    }
  };

  return (
    <nav className={styles.menu}>
      <ProfileTab
        value="profile"
        isActive={currentTab === "profile"}
        onClick={handleTabClick}
      >
        Профиль
      </ProfileTab>
      <ProfileTab
        value="orderHistory"
        isActive={currentTab === "orderHistory"}
        onClick={handleTabClick}
      >
        История заказов
      </ProfileTab>
      <ProfileTab value="logOut" isActive={false} onClick={handleTabClick}>
        Выход
      </ProfileTab>
    </nav>
  );
};
