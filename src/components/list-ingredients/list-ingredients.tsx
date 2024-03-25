import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useSelector } from "react-redux";
import {
  selectConstructorIngredients,
  selectBun,
} from "../../services/slices/constructor/burgerConstructorSlice";
import { selectIngredients } from "../../services/slices/ingredients/burgerIngredientsSlice";

interface ListIngredientsProps {
  titleIngredient: string;
  type: string;
}

const ListIngredients: React.FC<ListIngredientsProps> = ({
  titleIngredient,
  type,
}) => {
  const ingredients = useSelector(selectIngredients);
  // Фильтрация по типу ингредиента
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  const constructorIngredients = useSelector(selectConstructorIngredients);
  const bunIngredients = useSelector(selectBun);

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">
        {titleIngredient}
      </h2>

      <ul className={styles.ingredients_item}>
        {filteredIngredients.map((data) => (
          <BurgerIngredient
            key={data._id}
            {...data}
            count={
              titleIngredient === "Булки" &&
              bunIngredients &&
              bunIngredients._id === data._id
                ? 2
                : constructorIngredients.filter(
                    (ingredient) => ingredient._id === data._id
                  ).length
            } // Передача количества
          />
        ))}
      </ul>
    </>
  );
};

export default ListIngredients;
