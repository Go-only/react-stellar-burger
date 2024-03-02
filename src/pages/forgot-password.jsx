import styles from "./auth.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPage() {
  return (
    <div className={styles.wrap}>
      {/* <form className={styles.form} onSubmit={handleSubmit}> */}
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>

        <Input
          type="text"
          placeholder="Укажите e-mail"
          //   value={form.email}
          name={"email"}
          //   onChange={handleChange}
          error={false}
          errorText={"Введите корректный e-mail"}
          extraClass={styles.input}
        />

        <Button type="primary" size="medium" extraClass={styles.button}>
          Восстановить
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
