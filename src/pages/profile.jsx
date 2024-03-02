import styles from "./profile.module.css";
import { ProfileMenu } from "../components/profile-menu/profile-menu";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={"profile"} />
      <form
        className={styles.profile}
        // onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          //   value={form.name}
          //   onChange={handleChange}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />

        <Input
          type={"text"}
          name={"email"}
          placeholder={"e-mail"}
          //   value={form.email}
          //   onChange={handleChange}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />

        <Input
          type={"text"}
          name={"password"}
          placeholder={"Пароль"}
          //   value={form.password}
          //   onChange={handleChange}
          size={"default"}
          icon={"EditIcon"}
          error={false}
          extraClass={styles.input}
        />
        <div className={styles.buttonWrap}>
          <Button>Сохранить</Button>
          {/* <Button onClick={handleCansel as () => void} type="secondary">Отмена</Button> */}
          <Button type="secondary">Отмена</Button>
        </div>
      </form>
    </section>
  );
}
