import styles from "./burger-constructor.module.css";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function BurgerConstructor({ ingredients}) {

  const [orderModal, setOrderModal] = useState(false);

  const handleOrderClick = () => {
    setOrderModal(true);
  };

  const closeModalOrder = () => {
    setOrderModal(false);
  };

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
          thumbnail={buns[0].image}
          extraClass="ml-8"
        />
      </div>
      <div className={`${styles.zakaz} mt-10 mr-8`}>
        <div className={`${styles.total}`}>
        <p className="text text_type_digits-medium mr-2">2456</p>
        <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
        {orderModal && (
        <Modal onClose={closeModalOrder}>
          <OrderDetails />
        </Modal>
      )}
      </div>
    </section >
  );

}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};