import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';

export const IngredientDetails = ({ calories, carbohydrates, fat, image, name, proteins }) => {
  const default_text = "text text_type_digits-default"

  return (
      <div className={`${styles.container} pl-25 pr-25 pb-15`}>
        <img className={styles.img} src={image} alt={name} />
        <h3 className="text_type_main-medium mt-4 mb-8">{name}</h3>
        <ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
          <li className={styles.item}>
            <p className={styles.paragraf}>Калории, ккал</p>
            <p className={default_text}>{calories}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.paragraf}>Белки, г</p>
            <p className={default_text}>{proteins}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.paragraf}>Жиры, г</p>
            <p className={default_text}>{fat}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.paragraf}>Углеводы, г</p>
            <p className={default_text}>{carbohydrates}</p>
          </li>
        </ul>
      </div>
  );
}

IngredientDetails.propTypes = {
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
};