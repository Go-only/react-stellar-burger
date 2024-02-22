import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import ListIngredients from "../list-ingredients/list-ingredients";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/slices/burgerIngredientsSlice";

export default function BurgerIngredients() {
  
  const [current, setCurrent] = useState('one');

  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(state => state.burgerIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const main = ingredients.filter((ingredient) => ingredient.type == 'main');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  return (
    <section className={styles.section}>

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.wrapper}>
        <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.custom_scroll} ${styles.ingredients}`}>

      {loading || error ? (
      <p className={styles.loading}>{loading ? 'Идет загрузка ингредиентов' : `Произошла ошибка: ${error}`}</p>
    ) : (
      <>
        <ListIngredients titleIngredient="Булки" ingredients={buns} />
        <ListIngredients titleIngredient="Соусы" ingredients={sauces} />
        <ListIngredients titleIngredient="Начинки" ingredients={main} />
      </>
    )}

      </div>
    </section>
  );
}

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientType).isRequired,
// };
