import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  const menuTextClassNames = "text text_type_main-default ml-2";
  const menuMargin = "mt-4 mr-5 mb-4 ml-5";

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.center}>
          <a
            href="/"
            className={`${styles.center} ${styles.link} ${menuMargin}`}
          >
            <BurgerIcon type="secondary" />
            <p className={menuTextClassNames}>Конструктор</p>
          </a>
          <a
            href="#"
            className={`${styles.center} ${styles.link} ${menuMargin}`}
          >
            <ListIcon type="secondary" />
            <p className={menuTextClassNames}>Лента заказов</p>
          </a>
        </div>

        <a href="/" className={`${styles.center} ${styles.logo}`}>
          <Logo />
        </a>

        <a href="/profile" className={`${styles.profile} ${styles.link}`}>
          <ProfileIcon type="secondary" />
          <p className={menuTextClassNames}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}
