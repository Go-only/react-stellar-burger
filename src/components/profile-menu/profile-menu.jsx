import { useState } from "react";
import styles from "./profile-menu.module.css";
import ProfileTab from "../profile-tab/profile-tab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/slices/user/userSlice";

export const ProfileMenu = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [currentTab] = useState(activeTab);
  const navigate = useNavigate();

  const handleTabClick = (value) => {
    if (value === "profile") {
      navigate("/profile"); // Используем navigate для навигации
    }

    if (value === "orderHistory") {
      navigate("/profile/orders"); // Используем navigate для навигации
    }

    if (value === "logOut") {
      dispatch(logoutUser());
      navigate("/"); // Используем navigate для навигации
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
