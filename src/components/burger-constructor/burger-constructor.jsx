import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ ingredients }) {

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const other = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  console.log(buns);

  return (
    <section className={`${styles.section} mt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '58vh' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={buns[0].image}
          extraClass="ml-8"
        />
        <ul className={styles.list}>
          {other.map((ingredient) => (
            <li key={ingredient._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={buns[1].image}
          extraClass="ml-8"
        />
      </div>
    </section >
  );

}