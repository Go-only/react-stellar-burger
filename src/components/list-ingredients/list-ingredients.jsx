import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectConstructorIngredients,
  selectBun,
} from "../../services/slices/burgerConstructorSlice";
import { selectIngredients } from "../../services/slices/burgerIngredientsSlice";
import {
  openModal,
  closeModal,
  selectActiveModal,
} from "../../services/slices/modalSlice";

export default function ListIngredients({ titleIngredient, type }) {
  const ingredients = useSelector(selectIngredients);
  // Фильтрация по типу ингредиента
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const activeModal = useSelector(selectActiveModal);

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
            onClickIngredient={() =>
              dispatch(
                openModal({
                  isOpen: true,
                  title: "Детали ингредиента",
                  content: { ...data },
                  active: "ingredient",
                })
              )
            }
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

      {modalState.isOpen && activeModal === "ingredient" && (
        <Modal title={modalState.title} onClose={() => dispatch(closeModal())}>
          <IngredientDetails {...modalState.content} />
        </Modal>
      )}
    </>
  );
}

ListIngredients.propTypes = {
  titleIngredient: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
