import { useSelector } from "../../services";
import { IngredientType } from "../../utils/prop-types";
import styles from "./ingredient-icon.module.css";

interface IngredientIconProps {
  ingredient: string;
  counter?: number;
}

function IngredientIcon({ ingredient, counter }: IngredientIconProps) {
  const allIngredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const currentIngredient: IngredientType | undefined = allIngredients.find(
    (item) => item._id === ingredient
  );
  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={styles.icon__container}>
      <img
        className={styles.icon}
        src={currentIngredient.image}
        alt={currentIngredient.name}
      />
      {counter ? (
        <p
          className={`${styles.counter} text text_type_main-default`}
        >{`+${counter}`}</p>
      ) : null}
    </div>
  );
}

export default IngredientIcon;
