import burgerIngredientsSlice, { initialState } from "./burgerIngredientsSlice";
import { IngredientType } from "../../../utils/prop-types";

const response = {
  data: [],
};

describe("ingredientsSlice", () => {
  test("get ingredients", () => {
    expect(
      burgerIngredientsSlice(initialState, {
        type: "burgerIngredientsSlice/fetchIngredients/fulfilled",
        payload: response.data as IngredientType[],
      })
    ).toEqual({
      ...initialState,
      ingredients: response.data as IngredientType[],
    });
  });
});
