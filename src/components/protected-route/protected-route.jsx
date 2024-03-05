import { useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/slices/user/selector";
import { SpinnerCircular } from "spinners-react";
import styles from "./protected-route.module.css";

function ProtectedRoute({ children, onlyUnAuth }) {
  const location = useLocation();
  // const user = useSelector(getUser);
  const user = useSelector((state) => state.user.data);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    console.log("проверка аутентификации");
    return (
      <div className={styles.spinner}>
        <SpinnerCircular color="red" />
      </div>
    );
  }

  if (onlyUnAuth && user) {
    console.log("NAVIGATE FROM LOGIN TO INDEX");
    const from = location.state?.from || { pathname: "/" };
    console.log(from);
    return <Redirect replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("NAVIGATE FROM PAGE TO LOGIN");
    return <Redirect replace to={"/login"} state={{ from: location }} />;
  }

  console.log("RENDER COMPONENT");
  return children;
}

export default ProtectedRoute;