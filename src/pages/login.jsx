import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/slices/user/userSlice";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";

export function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>

        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={false}
          errorText={"Введите корректный e-mail"}
          extraClass={styles.input}
        />

        <PasswordInput
          placeholder="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
          size={"default"}
          extraClass={styles.input}
        />

        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass={styles.button}
        >
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
