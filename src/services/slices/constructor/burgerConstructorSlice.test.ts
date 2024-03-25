import burgerConstructorReducer, {
  initialState,
  addConstructorIngredient,
  removeIngredient,
  ingredientSort,
  clearConstructor,
} from "./burgerConstructorSlice";

const mockIngredient = {
  _id: "",
  name: "",
  type: "",
  image: "",
  price: 5,
  id: "",
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 5,
};

// const mockStateWithBun = {
//   ...initialState,
//   bun: mockBun,
// };

const mockStateWithIngredient = {
  ...initialState,
  constructorIngredients: [mockIngredient],
};

describe("burgerConstructor reducer", () => {
  test("add ingredient", () => {
    expect(
      burgerConstructorReducer(
        initialState,
        addConstructorIngredient(mockIngredient)
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [{ ...mockIngredient, id: expect.any(String) }],
    });
  });

  test("remove ingredient", () => {
    expect(
      burgerConstructorReducer(
        mockStateWithIngredient,
        removeIngredient({ id: mockIngredient.id })
      )
    ).toEqual({
      ...initialState,
      bun: null,
    });
  });

  test("sort ingredients", () => {
    expect(
      burgerConstructorReducer(
        mockStateWithIngredient,
        ingredientSort({ from: 0, to: 1 })
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [mockIngredient],
    });
  });

  // test("clear constructor", () => {
  //   expect(
  //     burgerConstructorReducer(mockStateWithBun, clearConstructor())
  //   ).toEqual(initialState);
  // });
});
