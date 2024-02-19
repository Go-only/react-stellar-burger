import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/slices/burgerIngredientsSlice";


function App() {
  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(state => state.burgerIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading || error) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <p className={styles.loading}>{loading ? 'Идет загрузка ингредиентов' : `Произошла ошибка: ${error}`}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;