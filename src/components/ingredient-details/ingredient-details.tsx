import styles from "./ingredient-details.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../services/slices/ingredients/burgerIngredientsSlice";

export const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredient = ingredients.find((item) => item._id === id);

  const default_text = "text text_type_digits-default";

  if (!ingredient) {
    return null;
  }

  return (
    <div className={`${styles.container} pl-25 pr-25 pb-15`}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img
        className={styles.img}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h3 className="text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul
        className={`${styles.list} text text_type_main-default text_color_inactive`}
      >
        <li className={styles.item}>
          <p className={styles.paragraf}>Калории, ккал</p>
          <p className={default_text}>{ingredient.calories}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.paragraf}>Белки, г</p>
          <p className={default_text}>{ingredient.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.paragraf}>Жиры, г</p>
          <p className={default_text}>{ingredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.paragraf}>Углеводы, г</p>
          <p className={default_text}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};
