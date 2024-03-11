import styles from "./profile.module.css";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkUserAuth, updateUserInfo } from "../../services/slices/userSlice";

export function ProfilePage() {
  const [form, setFormValues] = useState({ name: "", email: "", password: "" });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    setFormValues({
      ...form,
      name: userData.user.name,
      email: userData.user.email,
    });
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(form));
    dispatch(checkUserAuth());
    setIsFormChanged(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormValues({
      name: userData.user.name,
      email: userData.user.email,
      password: "",
    });
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.text}>
        <ProfileMenu activeTab={"profile"} />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.profile} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          value={form.name}
          onChange={handleChange}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />

        <Input
          type={"text"}
          name={"email"}
          placeholder={"e-mail"}
          value={form.email}
          onChange={handleChange}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />

        <Input
          type={"text"}
          name={"password"}
          placeholder={"Пароль"}
          value={form.password}
          onChange={handleChange}
          size={"default"}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />
        {isFormChanged && (
          <div className={styles.wrapper}>
            <Button htmlType="submit">Сохранить</Button>
            <Button onClick={handleCancel} htmlType="button" type="secondary">
              Отмена
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
