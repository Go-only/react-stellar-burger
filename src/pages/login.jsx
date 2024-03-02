import styles from "./auth.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className={styles.wrap}>
      {/* <form className={"auth-form " + styles.form} onSubmit={handleSubmit}> */}
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>

        <Input
          type="email"
          placeholder="E-mail"
          //   value={form.email}
          name={"email"}
          //   onChange={handleChange}
          error={false}
          errorText={"Введите корректный e-mail"}
          extraClass={styles.input}
        />

        <PasswordInput
          //   value={form.password}
          name={"password"}
          size={"default"}
          //   onChange={handleChange}
          extraClass={styles.input}
        />

        <Button type="primary" size="medium" extraClass={styles.button}>
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}
