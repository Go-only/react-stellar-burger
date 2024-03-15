import { useDispatch, useSelector } from "../../services";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import {
  openModal,
  closeModal,
  selectActiveModal,
} from "../../services/slices/modalSlice";
import {
  addConstructorIngredient,
  removeIngredient,
} from "../../services/slices/burgerConstructorSlice";
import { selectIngredients } from "../../services/slices/burgerIngredientsSlice";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { fetchOrderResult } from "../../services/slices/orderDetailsSlice";

import styles from "./burger-constructor.module.css";
import { useNavigate } from "react-router-dom";
import { IngredientType } from "../../utils/prop-types";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const activeModal = useSelector(selectActiveModal);
  const ingredients = useSelector(selectIngredients); // Ингредиенты полученные через API
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.constructorIngredients
  ); // Список ингредиентов в конструкторе
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (droppedIngredientId: IngredientType, monitor) => {
      onDropHandler(droppedIngredientId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function onDropHandler(droppedIngredientId: IngredientType) {
    // Находим информацию о перетаскиваемом ингредиенте
    const draggedIngredient = ingredients.find(
      (ingredient) => ingredient._id === droppedIngredientId._id
    );

    if (draggedIngredient) {
      dispatch(addConstructorIngredient(draggedIngredient));
    }
  }

  const handleDeleteIngredient = (item: IngredientType) =>
    dispatch(removeIngredient(item));

  function getTotalPrice() {
    let priceBun = 0;
    let priceConstructorIngredients = 0;

    if (constructorIngredients.length > 0) {
      if (bun) {
        priceBun = bun.price * 2;
      }

      priceConstructorIngredients = constructorIngredients.reduce(function (
        sum,
        ingredient
      ) {
        return sum + Number(ingredient.price);
      },
      0);
    } else {
      // Если ингредиенты между булками отсутствуют, то общая стоимость равна стоимости булок
      if (bun) {
        priceBun = bun.price * 2;
      }
    }

    return priceBun + priceConstructorIngredients;
  }

  return (
    <section className={`${styles.section} mt-25`}>
      <div
        className={styles.wrapper}
        ref={dropTarget}
        style={{ border: isHover ? "1px solid #4c4cff" : "transparent" }}
      >
        <span className={styles.title}>
          {!isHover &&
            !bun &&
            constructorIngredients.length === 0 &&
            "Перетащите сюда ингредиенты для бургера"}
          {isHover && "Отпустите ингредиент над выделенной областью"}
        </span>

        {/* Верхняя булка */}
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.element} ml-8`}
          />
        )}

        {/* Список остальных ингредиентов */}
        <ul className={styles.list}>
          {constructorIngredients.map((ingredient, index) => (
            <BurgerConstructorItem
              item={ingredient}
              index={index}
              key={ingredient.id}
              handleDeleteIngredient={handleDeleteIngredient}
            />
          ))}
        </ul>

        {/* Нижняя булка */}
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.element} ml-8`}
          />
        )}
      </div>
      <div className={`${styles.zakaz} mt-10 mr-8`}>
        <div className={`${styles.total}`}>
          <p className="text text_type_digits-medium mr-2">{getTotalPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            // Проверяем существование пользователя
            if (!user) {
              // Переходим на страницу /login, если пользователь не существует
              navigate("/login");
            } else {
              // Иначе, выполняем остальные действия
              dispatch(
                openModal({
                  isOpen: true,
                  content: "Данные заказа",
                  active: "order",
                  title: "",
                })
              );
              dispatch(
                fetchOrderResult({
                  ingredients: [
                    ...constructorIngredients.map((e) => e._id),
                    bun ? bun._id : "",
                  ],
                })
              );
            }
          }}
          disabled={bun === null && constructorIngredients.length === 0}
        >
          Оформить заказ
        </Button>
        {modalState.isOpen && activeModal === "order" && (
          <Modal onClose={() => dispatch(closeModal())}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}
