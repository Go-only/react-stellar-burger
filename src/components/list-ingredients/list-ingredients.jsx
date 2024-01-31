import styles from "./list-ingredients.module.css";
import BurgerIngredient from "../burger-Ingredient/burger-Ingredient";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export default function ListIngredients({ title, ingredients }) {

  const [ingredientModal, setIngredientModal] = useState(null)
  const closeModalIngredient = () => { setIngredientModal(null) }

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
      <ul className={styles.ingredients_item}>

        {ingredients.map(data => <BurgerIngredient
                                    key={data._id}
                                    {...data}
                                    onClickIngredient={() => setIngredientModal(data)} />)}
                                    
      </ul>
      {ingredientModal && <Modal title="Детали ингредиента" onClose={closeModalIngredient}>
        <IngredientDetails {...ingredientModal} />
      </Modal>}
    </>
  )
}