import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPage } from "../../pages/forgot-password";
import { ResetPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { OrdersPage } from "../../pages/orders";
import ProtectedRoute from "../protected-route/protected-route";
import { useDispatch } from "react-redux";
import { getLoginUser, getRegisterUser } from "../../utils/api";

function App() {
  const dispatch = useDispatch;

  const clbLogin = (dataUser) => {
    dispatch(getLoginUser(dataUser));
  };

  const clbRegister = (dataUser) => {
    dispatch(getRegisterUser(dataUser));
  };

  return (
    <Router>
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
              <ForgotPage />
            </Route>

            <Route path="/reset-password">
              <ResetPage />
            </Route>

            <Route path="/profile" exact={true}>
              <ProfilePage />
            </Route>

            <Route path="/profile/orders" exact={true}>
              <OrdersPage />
            </Route>

            <Route path="/">
              <BurgerIngredients />
              <BurgerConstructor />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
