import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPage } from "../../pages/forgot-password/forgot-password";
import { ResetPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { OrdersPage } from "../../pages/orders/orders";
import ProtectedRoute from "../protected-route/protected-route";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser, getRegisterUser } from "../../utils/api";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/slices/userSlice";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import { Modal } from "../modal/modal";
import HomePage from "../../pages/home-page/home-page";
import {
  fetchIngredients,
  selectIngredients,
} from "../../services/slices/burgerIngredientsSlice";
import ErrorPage from "../../pages/error-page/error-page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  let navigate = useNavigate();
  let state = location.state;

  const closeModal = () => {
    navigate(-1);
  };

  const clbLogin = (dataUser) => {
    dispatch(getLoginUser(dataUser));
  };

  const clbRegister = (dataUser) => {
    dispatch(getRegisterUser(dataUser));
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes
          location={
            state && state.backgroundLocation
              ? state.backgroundLocation
              : location
          }
        >
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage onLogin={clbLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage onRegister={clbRegister} />
              </ProtectedRoute>
            }
          />

          <Route
            path="forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />

          <Route path="ingredients/:id" element={<IngredientPage />} />
        </Routes>

        {state && state.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
