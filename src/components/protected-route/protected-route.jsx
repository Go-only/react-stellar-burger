import { useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/slices/user/selector";

function ProtectedRoute({ children, onlyUnAuth }) {
  const location = useLocation();
  // const user = useSelector(getUser);
  const user = useSelector((state) => state.user.data);
  const isAuthChecked = useSelector(getIsAuthChecked);
  console.log("проверка существования юзера в стейте");
  console.log(user);
  console.log(isAuthChecked);

  if (!isAuthChecked) {
    console.log("проверка аутентификации");
  }

  if (onlyUnAuth && user) {
    console.log("NAVIGATE FROM LOGIN TO INDEX");
    const from = location.state?.from || { pathname: "/" };
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
