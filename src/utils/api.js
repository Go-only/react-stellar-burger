const baseUrl = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
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

export { getIngredientsRequest, createOrderRequest };