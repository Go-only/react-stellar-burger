import Order from "../../components/order/order";
import styles from "./feed.module.css";
import FeedStat from "../../components/feed-stat/feed-stat";
import { useDispatch, useSelector } from "../../services";
import { useEffect } from "react";
import { wsConnectFeed, wsDisconnectFeed } from "../../services/feed/actions";

function FeedPage() {
  const dispatch = useDispatch();
  const wsUrl = "wss://norma.nomoreparties.space/orders/all";
  const orders = useSelector((store) => store.feed.data);

  useEffect(() => {
    dispatch(
      wsConnectFeed({
        wsUrl: wsUrl,
        withTokenRefresh: true,
      })
    );
    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, [dispatch]);

  return (
    <main className={styles.feed__container}>
      <h1 className="text text_type_main-medium mb-4">Лента заказов</h1>
      <div className={styles.orders__container}>
        <section className={styles.orders}>
          {orders?.orders.map((order) => (
            <Order order={order} url={"/feed"} key={order._id} />
          ))}
        </section>
        <section className={styles.order__status}>
          <FeedStat />
        </section>
      </div>
    </main>
  );
}
export default FeedPage;
