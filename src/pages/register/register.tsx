import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../auth.module.css";
import { Link } from "react-router-dom";

interface RegisterPageProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(formData); // Вызываем функцию registerUser из Redux slice и передаем ей данные формы
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={false}
          errorText={"Введите корректное имя"}
          extraClass={styles.input}
        />

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
