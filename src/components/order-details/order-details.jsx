import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import done from '../../images/done.png';

export const OrderDetails = () => {

  return (
    <div className={`${styles.container} mb-30`}>
      <p className="text text_type_digits-large mt-14">034536</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={styles.checkmark}>
        <img src={done} alt="иконка" className={styles.don} />
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}