import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../services/slices/modalSlice';

export default function ListIngredients({ titleIngredient, ingredients }) {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">{titleIngredient}</h2>
      <ul className={styles.ingredients_item}>
        {ingredients.map(data => (
          <BurgerIngredient
            key={data._id}
            {...data}
            onClickIngredient={() => dispatch(openModal({ isOpen: true, content: {...data} }))}
          />
        ))}
      </ul>

      {modalState.isOpen && (
        <Modal title="Детали ингредиента" onClose={() => dispatch(closeModal())}>
         <IngredientDetails {...modalState.content} />
       </Modal>
      )}

    </>
  );
}

ListIngredients.propTypes = {
  titleIngredient: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
