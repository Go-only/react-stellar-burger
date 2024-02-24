const api_url = "https://norma.nomoreparties.space/api";

function getIngredientsRequest() {
  return fetch(`${api_url}/ingredients`);
}

function createOrderRequest(ingredients) {
    return fetch(`${api_url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
    });
  }

export { getIngredientsRequest, createOrderRequest };
