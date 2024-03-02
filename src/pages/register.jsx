import styles from "./auth.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function RegisterPage() {
  return (
    <div className={styles.wrap}>
      {/* <form className={styles.form} onSubmit={handleSubmit}> */}
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

        <Input
          type="text"
          placeholder="Имя"
          //   value={form.name}
          name={"name"}
          //   onChange={handleChange}
          error={false}
          errorText={"Введите корректное имя"}
          extraClass={styles.input}
        />

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
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
