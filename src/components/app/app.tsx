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
import { useDispatch } from "../../services";
import { useEffect } from "react";
import {
  checkUserAuth,
  loginUser,
  registerUser,
} from "../../services/slices/userSlice";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import { Modal } from "../modal/modal";
import HomePage from "../../pages/home-page/home-page";
import { fetchIngredients } from "../../services/slices/burgerIngredientsSlice";
import ErrorPage from "../../pages/error-page/error-page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  let state = location.state as { backgroundLocation?: Location };

  const closeModal = () => {
    navigate(-1);
  };

  const clbLogin = (dataUser: { email: string; password: string }) => {
    dispatch(loginUser(dataUser));
  };

  const clbRegister = (dataUser: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser(dataUser));
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