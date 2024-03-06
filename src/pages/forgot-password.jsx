import styles from "./auth.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { forgotPassword } from "../services/slices/user/userSlice";

export function ForgotPage() {
  const [form, setFormValues] = useState({ email: "" });
  const [redirectToResetPassword, setRedirectToResetPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form.email));
    setRedirectToResetPassword(true);
  };

  if (redirectToResetPassword) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { fromForgotPassword: true },
        }}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>

        <Input
          type="text"
          placeholder="Укажите e-mail"
          value={form.email}
          name={"email"}
          onChange={handleChange}
          error={false}
          errorText={"Введите корректный e-mail"}
          extraClass={styles.input}
        />

        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass={styles.button}
        >
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
