import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
import ListIngredients from "../list-ingredients/list-ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services";

export default function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const [bunsRef, bunsInView] = useInView();
  const [saucesRef, saucesInView] = useInView();
  const [mainRef, mainInView] = useInView();
  const { loading, error } = useSelector((state) => state.burgerIngredients);

  useEffect(() => {
    if (bunsInView) {
      setCurrent("one");
    } else if (saucesInView) {
      setCurrent("two");
    } else if (mainInView) {
      setCurrent("three");
    }
  }, [bunsInView, saucesInView, mainInView]);

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.wrapper}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => setCurrent("one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => setCurrent("two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => setCurrent("three")}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.custom_scroll} ${styles.ingredients}`}>
        {loading || error ? (
          <p className={styles.loading}>
            {loading
              ? "Идет загрузка ингредиентов"
              : `Произошла ошибка: ${error}`}
          </p>
        ) : (
          <>
            <div ref={bunsRef}>
              <ListIngredients titleIngredient="Булки" type="bun" />
            </div>
            <div ref={saucesRef}>
              <ListIngredients titleIngredient="Соусы" type="sauce" />
            </div>
            <div ref={mainRef}>
              <ListIngredients titleIngredient="Начинки" type="main" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
