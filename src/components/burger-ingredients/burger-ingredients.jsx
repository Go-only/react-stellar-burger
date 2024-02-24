import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
import ListIngredients from "../list-ingredients/list-ingredients";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';
// import { ingredientType } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/slices/burgerIngredientsSlice";

export default function BurgerIngredients() {
  
  const [current, setCurrent] = useState('one');
  const [bunsRef, bunsInView] = useInView();
  const [saucesRef, saucesInView] = useInView();
  const [mainRef, mainInView] = useInView();

  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(state => state.burgerIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (bunsInView) {
      setCurrent('one');
    } else if (saucesInView) {
      setCurrent('two');
    } else if (mainInView) {
      setCurrent('three');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const main = ingredients.filter((ingredient) => ingredient.type === 'main');
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
        <div ref={bunsRef}>
          <ListIngredients titleIngredient="Булки" ingredients={buns}   />
        </div>
        <div ref={saucesRef}>
          <ListIngredients titleIngredient="Соусы" ingredients={sauces} />
        </div>
        <div ref={mainRef}>
          <ListIngredients titleIngredient="Начинки" ingredients={main} />
        </div>
      </>
    )}

      </div>
    </section>
  );
}

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientType).isRequired,
// };
