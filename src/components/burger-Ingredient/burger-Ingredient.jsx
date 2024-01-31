import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredient({image, name, price, onClickIngredient}) {

  const itemMargin = "mt-5 ml-4";

  return (
    <li className={`${styles.item} ${itemMargin}`} onClick={onClickIngredient}>
      <img src={image} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );

}
