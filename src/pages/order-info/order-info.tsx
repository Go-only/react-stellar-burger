import { useParams } from "react-router";
import styles from "./order-info.module.css";
import { useDispatch, useSelector } from "../../services";
import { useEffect } from "react";
import IngredientIcon from "../../components/ingredient-icon/ingredient-icon";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { calculatePrice } from "../../utils/calculate-price";

import { SpinnerCircular } from "spinners-react";
import { getOrder } from "../../services/slices/orderDetailsSlice";

function OrderInfo() {
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orderDetails);
  const { number } = useParams();
  const allIngredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  console.log(allIngredients);

  useEffect(() => {
    if (number) {
      dispatch(getOrder(number));
    }
  }, [dispatch, number]);

  return (
    <>
      {loading ? (
        <SpinnerCircular color="red" />
      ) : (
        currentOrder && (
          <div className={`${styles.order_info_container} pl-10 pr-10 pb-15`}>
            <p
              className={`${styles.order_number} text text_type_digits-default mb-10`}
            >{`#${currentOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">
              {currentOrder.name}
            </h2>
            <p
              className="text text_type_main-default mb-15"
              style={{ color: currentOrder.status === "done" ? "#0cc" : "" }}
            >
              {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
            </p>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <div className={styles.ingredients_container}>
              {currentOrder.ingredients
                .reduce((unique: string[], item: string) => {
                  return unique.includes(item) ? unique : [...unique, item];
                }, [])
                .map((item, index) => {
                  const ingredient = allIngredients?.find(
                    (ingredient) => ingredient._id === item
                  );
                  return (
                    ingredient && (
                      <div key={index} className={styles.ingredient}>
                        <div className={styles.ingredient_name}>
                          <IngredientIcon ingredient={ingredient?._id} />
                          <p className="text text_type_main-default">
                            {ingredient.name}
                          </p>
                        </div>
                        <div className={styles.price_container}>
                          <p className="text text_type_digits-default">
                            {`${
                              currentOrder.ingredients.filter((i) => i === item)
                                .length
                            } x`}
                          </p>
                          <p className="text text_type_digits-default">
                            {ingredient.price}
                          </p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div className={styles.total}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(currentOrder.createdAt)} />{" "}
                i-GMT+3
              </p>
              <div className={styles.price_container}>
                <p className="text text_type_digits-default">
                  {calculatePrice(currentOrder, allIngredients)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default OrderInfo;
