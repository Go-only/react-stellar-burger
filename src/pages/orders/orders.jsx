import styles from "./orders.module.css";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";

export function OrdersPage() {
  return (
    <section className={styles.wrap}>
      <div className={styles.text}>
        <ProfileMenu activeTab={"orderHistory"} />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <p>История заказов</p>
    </section>
  );
}
