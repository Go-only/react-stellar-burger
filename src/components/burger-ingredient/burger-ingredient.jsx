import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function BurgerIngredient({image, name, price, onClickIngredient}) {

  const itemMargin = "mt-5 ml-4";

  return (
    <li className={`${styles.item} ${itemMargin}`} onClick={onClickIngredient}>
      <div className={styles.counter}><p className={styles.num}>1</p></div>
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );

}


BurgerIngredient.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClickIngredient: PropTypes.func.isRequired,
};