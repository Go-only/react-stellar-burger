import { getCookie, setCookie } from "./cookies";

const baseUrl = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((errorData) => {
    throw new Error(`Ошибка ${res.status}: ${errorData.message}`);
  });
}

function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

async function refreshToken() {
  // Функция для обновления токена
  try {
    const refreshToken = getCookie("refreshToken"); // Получаем refreshToken из cookie
    const res = await request("auth/token", {
      // Выполняем запрос к API для обновления токена
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }), // Передаем refreshToken в теле запроса
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function requestWithRefresh(endpoint, options = {}) {
  // Функция для выполнения запросов с обновлением токена
  try {
    const res = await request(endpoint, options); // Выполняем запрос к API
    return res; // Возвращаем результат запроса
  } catch (error) {
    // Обрабатываем ошибки
    console.log("requestWithRefresh");
    if (error.statusCode === 401 || error.statusCode === 403) {
      // Если получена ошибка авторизации или доступа
      try {
        const refreshData = await this.refreshToken(); // Обновляем токен
        if (!refreshData.success) {
          // Если обновление токена неуспешно
          return Promise.reject(refreshData);
        }
        setCookie("accessToken", refreshData.accessToken); // Устанавливаем новый accessToken в cookie
        setCookie("refreshToken", refreshData.refreshToken); // Устанавливаем новый refreshToken в cookie
        return await request(endpoint, {
          // Повторно выполняем исходный запрос с обновленным токеном
          ...options,
          headers: {
            ...options.headers,
            authorization: refreshData.accessToken, // Устанавливаем заголовок авторизации с новым accessToken
          },
        });
      } catch (error) {
        throw error;
      }
    }
    throw error;
  }
}

function getIngredientsRequest() {
  return request("/ingredients");
}

function createOrderRequest(ingredients) {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredients),
  });
}

function getRegisterUser(data) {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getLoginUser(data) {
  return requestWithRefresh("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getUser() {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("Токен не найден");
  }
  return requestWithRefresh("/auth/user", {
    method: "GET",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  });
}

function forgotPasswordApi(email) {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

function resetPasswordApi(data) {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function updateUserProfile(data) {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("Токен не найден");
  }
  return requestWithRefresh("/auth/user", {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(data),
  });
}

function logoutUserApi() {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
}

export {
  getIngredientsRequest,
  createOrderRequest,
  getLoginUser,
  getUser,
  getRegisterUser,
  refreshToken,
  requestWithRefresh,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserProfile,
  logoutUserApi,
};
