import React from "react";
import styles from "./profile-menu.module.css";
import ProfileTab from "../profile-tab/profile-tab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services";
import { logoutUser } from "../../services/slices/userSlice";

interface ProfileMenuProps {
  activeTab: string;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabClick = (value: string) => {
    if (value === "profile") {
      navigate("/profile");
    }

    if (value === "orderHistory") {
      navigate("/profile/orders");
    }

    if (value === "logOut") {
      dispatch(logoutUser());
      navigate("/");
    }
  };

  return (
    <nav className={styles.menu}>
      <ProfileTab value="profile" isActive={activeTab === "profile"} onClick={handleTabClick}>
        Профиль
      </ProfileTab>
      <ProfileTab value="orderHistory" isActive={activeTab === "orderHistory"} onClick={handleTabClick}>
        История заказов
      </ProfileTab>
      <ProfileTab value="logOut" isActive={false} onClick={handleTabClick}>
        Выход
      </ProfileTab>
    </nav>
  );
};
