import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { useState, useEffect } from 'react';

const api_url = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        const data = await response.json();
        setIngredients(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Вызов setLoading(false) в блоке finally
      }
    };
  
    fetchIngredients();
  }, []);
  

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
      <main className={styles.main} >

        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />

      </main>
    </div>
  );
}
export default App;
