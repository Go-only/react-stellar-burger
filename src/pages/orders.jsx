import styles from "./profile.module.css";
import { ProfileMenu } from "../components/profile-menu/profile-menu";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function OrdersPage() {
  return (
    <section className={styles.wrap}>
      <div className={styles.text}>
        <ProfileMenu activeTab={"orderHistory"} />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </section>
  );
}