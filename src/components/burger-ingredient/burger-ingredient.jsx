import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag, DragPreviewImage } from "react-dnd";
import { Link } from "react-router-dom";

export default function BurgerIngredient({
  _id,
  image,
  name,
  price,
  onClickIngredient,
  count,
}) {
  const itemMargin = "mt-5 ml-4";
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`${styles.item} ${itemMargin}`}
      // onClick={onClickIngredient}
      ref={dragRef}
    >
      <Link to={`/ingredients/${_id}`} state={{ backgroundLocation: location }}>
        {count > 0 && (
          <div className={styles.counter}>
            <p className={styles.num}>{count}</p>
          </div>
        )}

        {/* Обертка для превью изображения при перетаскивании */}
        <DragPreviewImage connect={preview} src={image} />
        <img src={image} alt={name} style={{ opacity: isDragging ? 0.4 : 1 }} />
        <div className={styles.price}>
          <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{name}</p>
      </Link>
    </li>
  );
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClickIngredient: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
