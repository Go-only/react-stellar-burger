import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function AppHeader() {
  const menuTextClassNames = "text text_type_main-default ml-2";
  const menuMargin = "mt-4 mr-5 mb-4 ml-5";
  const activeLink = `${styles.active_link}`;
  const defaultLink = ` ${styles.link} ${menuMargin} ${styles.center}`;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.center}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${activeLink} ${defaultLink}` : `${defaultLink}`
            }
          >
            <BurgerIcon type="secondary" />
            <p className={menuTextClassNames}>Конструктор</p>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? `${activeLink} ${defaultLink}` : `${defaultLink}`
            }
          >
            <ListIcon type="secondary" />
            <p className={menuTextClassNames}>Лента заказов</p>
          </NavLink>
        </div>

        <p className={`${styles.center} ${styles.logo}`}>
          <Link to="/">
            <Logo />
          </Link>
        </p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${activeLink} ${styles.link}` : `${styles.link}`
          }
        >
          <ProfileIcon type="secondary" />
          <p className={menuTextClassNames}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}
