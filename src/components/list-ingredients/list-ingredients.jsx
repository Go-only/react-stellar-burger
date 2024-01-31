import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-Ingredient/burger-Ingredient";

export default function ListIngredients({ title, ingredients }) {
  const itemMargin = "mt-5 ml-4";

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
      <ul className={styles.ingredients_item}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={`${styles.item} ${itemMargin}`}>
            <BurgerIngredient
              src={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
            />
          </li>
        ))}
      </ul>
    </>
  );
}