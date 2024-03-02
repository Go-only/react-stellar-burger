import { useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/slices/user/selector";

function ProtectedRoute({ children, onlyUnAuth }) {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    console.log("WAIT USER CHECKOUT");
    return "Загрузка";
  }

  if (onlyUnAuth && user) {
    console.log("NAVIGATE FRON LOGIN TO INDEX");
    return <Redirect to={"/"} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("NAVIGATE FRON PAGE TO LOGIN");
    return <Redirect to={"/login"} />;
  }
  console.log("RENDER COMPONENT");
  return children;
}

export default ProtectedRoute;
