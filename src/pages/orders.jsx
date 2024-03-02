import styles from "./profile.module.css";
import { ProfileMenu } from "../components/profile-menu/profile-menu";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function OrdersPage() {
  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={"orderHistory"} />
    </section>
  );
}
