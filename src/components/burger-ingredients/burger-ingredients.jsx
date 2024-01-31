import React from "react";
import styles from "./burger-ingredients.module.css";
import ListIngredients from "../list-ingredients/list-ingredients";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients({ ingredients }) {
  console.log(ingredients);
  const [current, setCurrent] = React.useState('one');

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
  const fillings = ingredients.filter((ingredient) => ingredient.type !== 'bun' && ingredient.type !== 'sauce');

  return (
    <section className={styles.section}>

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div style={{ display: 'flex' }}>
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

      <ListIngredients title="Булки" ingredients={buns} />
      <ListIngredients title="Соусы" ingredients={sauces} />
      <ListIngredients title="Начинки" ingredients={fillings} />

      </div>
    </section>
  );
}