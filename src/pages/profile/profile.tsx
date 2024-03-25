import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./profile.module.css";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services";
import { checkUserAuth, updateUserInfo } from "../../services/slices/userSlice";

type UserData = {
  name: string;
  email: string;
} | null;

export const ProfilePage: React.FC = () => {
  const [form, setFormValues] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: { user: { data: UserData } }) => state.user.data
  );

  useEffect(() => {
    setFormValues({
      ...form,
      name: userData?.name || "",
      email: userData?.email || "",
    });
  }, [userData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserInfo(form));
    dispatch(checkUserAuth());
    setIsFormChanged(false);
  };

  const handleCancel = () => {
    setFormValues({
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
    });
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.text}>
        <ProfileMenu activeTab="profile" />
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
};
