import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { openModal, closeModal } from '../../services/slices/modalSlice';
import { setDraggedIngredientId, addConstructorIngredient } from '../../services/slices/burgerConstructorSlice';
import { selectIngredients } from '../../services/slices/burgerIngredientsSlice';
// import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const constructorIngredients = useSelector(state => state.burgerConstructor.constructorIngredients);
  const bun = useSelector(state => state.burgerConstructor.bun);
  const ingredients = useSelector(selectIngredients);

   console.log(ingredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (droppedIngredientId, monitor) => {
      const draggedIngredient = ingredients.find(ingredient => ingredient._id === droppedIngredientId); // Найти информацию о перетаскиваемом ингредиенте
      console.log(draggedIngredient);
      // console.log(droppedIngredientId);
      dispatch(addConstructorIngredient(draggedIngredient));
      dispatch(setDraggedIngredientId(droppedIngredientId));
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  

  return (
    <section className={`${styles.section} mt-25`}>
      <div className={styles.wrapper} ref={dropTarget} style={{ border: isHover ? '1px solid red' : 'transparent' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          // thumbnail={buns[0].image}
          extraClass="ml-8"
        />
        <ul className={styles.list}>
          {ingredients.map((ingredient) => (
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
          // thumbnail={buns[0].image}
          extraClass="ml-8"
        />
      </div>
      <div className={`${styles.zakaz} mt-10 mr-8`}>
        <div className={`${styles.total}`}>
          <p className="text text_type_digits-medium mr-2">2456</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => dispatch(openModal({ isOpen: true, content: 'Данные заказа' }))}>
          Оформить заказ
        </Button>
        {modalState.isOpen && (
          <Modal onClose={() => dispatch(closeModal())}>
            <OrderDetails {...modalState.content} />
          </Modal>
        )}
      </div>
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//   })).isRequired,
// };
