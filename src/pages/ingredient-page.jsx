import styles from "./ingredient-page.module.css";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";

export const IngredientPage = () => {
  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};
