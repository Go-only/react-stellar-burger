import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPage } from "../../pages/forgot-password";
import { ResetPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { OrdersPage } from "../../pages/orders";
import ProtectedRoute from "../protected-route/protected-route";
import { useDispatch } from "react-redux";
import { getLoginUser, getRegisterUser } from "../../utils/api";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/slices/user/userSlice";

function App() {
  const dispatch = useDispatch();

  const clbLogin = (dataUser) => {
    dispatch(getLoginUser(dataUser));
  };

  const clbRegister = (dataUser) => {
    dispatch(getRegisterUser(dataUser));
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/login">
            <ProtectedRoute onlyUnAuth>
              <LoginPage onLogin={clbLogin} />
            </ProtectedRoute>
          </Route>

          <Route path="/register">
            <ProtectedRoute onlyUnAuth>
              <RegisterPage onRegister={clbRegister} />
            </ProtectedRoute>
          </Route>

          <Route path="/forgot-password">
            <ProtectedRoute onlyUnAuth>
              <ForgotPage />
            </ProtectedRoute>
          </Route>

          <Route path="/reset-password">
            <ProtectedRoute onlyUnAuth>
              <ResetPage />
            </ProtectedRoute>
          </Route>

          <Route path="/profile" exact={true}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>

          <Route path="/profile/orders" exact={true}>
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          </Route>

          <Route path="/">
            <BurgerIngredients />
            <BurgerConstructor />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
