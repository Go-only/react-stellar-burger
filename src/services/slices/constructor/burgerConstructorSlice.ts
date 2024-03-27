import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { IngredientType } from "../../../utils/prop-types";

const sliceName = "burgerConstructor";

interface IConstructorState {
  bun: IngredientType | null;
  constructorIngredients: IngredientType[];
}

export const initialState: IConstructorState = {
  bun: null, // булка
  constructorIngredients: [], // список всех ингредиентов в текущем конструкторе бургера
};

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      // Находим индекс ингредиента, который нужно удалить
      const index = state.constructorIngredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (index !== -1) {
        state.constructorIngredients.splice(index, 1);
      }
    },
    addConstructorIngredient: (
      state,
      action: PayloadAction<IngredientType>
    ) => {
      if (action.payload.type === "bun") {
        state.constructorIngredients = state.constructorIngredients.filter(
          (ingredient) => ingredient.type !== "bun"
        );
        state.bun = action.payload;
      } else {
        state.constructorIngredients.push({ ...action.payload, id: uuid() });
      }
    },
    ingredientSort(state, action: PayloadAction<{ from: number; to: number }>) {
      state.constructorIngredients.splice(
        action.payload.to,
        0,
        state.constructorIngredients.splice(action.payload.from, 1)[0]
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.constructorIngredients = [];
    },
  },
});

export const {
  removeIngredient,
  addConstructorIngredient,
  ingredientSort,
  clearConstructor,
} = burgerConstructorSlice.actions;

export const selectConstructorIngredients = (state: {
  burgerConstructor: IConstructorState;
}) => state.burgerConstructor.constructorIngredients;

export const selectBun = (state: { burgerConstructor: IConstructorState }) =>
  state.burgerConstructor.bun;

export default burgerConstructorSlice.reducer;
