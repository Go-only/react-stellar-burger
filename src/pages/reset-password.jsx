import styles from "./auth.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPage() {
  return (
    <div className={styles.wrap}>
      {/* <form className={styles.form} onSubmit={handleSubmit}> */}
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>

        <PasswordInput
          //   value={form.password}
          name={"password"}
          size={"default"}
          //   onChange={handleChange}
          extraClass={styles.input}
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          //   value={form.resetCode}
          name={"resetCode"}
          //   onChange={handleChange}

          error={false}
          errorText={""}
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
