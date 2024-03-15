import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./error-page.module.css";

function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_digits-large pb-10">404</h1>
      <p className="text text_type_digits-medium pb-10">
        Этой страницы не существует
      </p>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => window.history.back()}
      >
        Вернуться
      </Button>
    </div>
  );
}

export default ErrorPage;
