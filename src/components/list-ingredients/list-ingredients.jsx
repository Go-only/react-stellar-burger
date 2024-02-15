import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';

export default function ListIngredients({ titleIngredient, ingredients }) {

  const [ingredientModal, setIngredientModal] = useState(null)
  const closeModalIngredient = () => { setIngredientModal(null) }

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">{titleIngredient}</h2>
      <ul className={styles.ingredients_item}>

        {ingredients.map(data => <BurgerIngredient
          key={data._id}
          {...data}
          onClickIngredient={() => setIngredientModal(data)} />)}

      </ul>
      {ingredientModal && <Modal titleFormIngredient="Детали ингредиента" onClose={closeModalIngredient}>
        <IngredientDetails {...ingredientModal} />
      </Modal>}
    </>
  )
}

ListIngredients.propTypes = {
  titleIngredient: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired, // Используем ingredientType здесь
};
