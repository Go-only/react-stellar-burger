import styles from "../auth.module.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/slices/userSlice";

export function ResetPage() {
  const [form, setFormValues] = useState({ password: "", token: "" });
  const [redirectToResetPassword, setRedirectToResetPassword] = useState(false);
  const location = useLocation();
  const [redirectToForgotPassword, setRedirectToForgotPassword] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.state?.fromForgotPassword) {
      setRedirectToForgotPassword(true);
    }
  }, [location]);

  if (redirectToForgotPassword) {
    return <Navigate to="/forgot-password" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(form));
    setRedirectToResetPassword(true);
  };

  if (redirectToResetPassword) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>

        <PasswordInput
          value={form.password}
          name={"password"}
          size={"default"}
          onChange={handleChange}
          extraClass={styles.input}
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          value={form.token}
          name={"token"}
          onChange={handleChange}
          error={false}
          errorText={""}
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
