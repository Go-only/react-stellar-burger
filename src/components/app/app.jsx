import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
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
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientPage } from "../../pages/ingredient-page";
import { Modal } from "../modal/modal";
import HomePage from "../../pages/home-page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // let navigate = useNavigate();
  let state = location.state;
  // console.log(location);

  // const closeModal = () => {
  //   navigate(-1);
  // };

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

          <Route path="ingredients/:id" element={<IngredientPage />} />
        </Routes>

        {/* {state && (
          <Routes>
            <Route path="/ingredients/:id">
              <Modal title="Детали Ингридиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            </Route>
          </Routes>
        )} */}
      </main>
    </div>
  );
}

export default App;
