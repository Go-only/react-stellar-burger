import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';


const sliceName = 'burgerConstructor';
const initialState = {
  bun: null,                  // булка
  constructorIngredients: [], // список всех ингредиентов в текущем конструкторе бургера
};

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    removeIngredient: (state, action) => {
      const removedIngredient = state.constructorIngredients.find(ingredient => ingredient._id === action.payload._id);
      if (removedIngredient) {
        // Если количество ингредиента больше 1, уменьшаем его счетчик на 1
        if (removedIngredient.count && removedIngredient.count > 1) {
          removedIngredient.count -= 1;
        } else {
          // Если количество ингредиента равно 1 или отсутствует счетчик, удаляем его из конструктора
          const index = state.constructorIngredients.findIndex(ingredient => ingredient.id === action.payload.id);
          if (index !== -1) {
            state.constructorIngredients.splice(index, 1);
          }
        }
      }
    },
    addConstructorIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun');
        state.bun = action.payload;
      } else {
        const existingIngredient = state.constructorIngredients.find(ingredient => ingredient._id === action.payload._id);
        if (existingIngredient) {
          state.constructorIngredients.push({ ...action.payload, id: uuid() });
          existingIngredient.count += 1; // Увеличиваем счетчик ингредиента на 1
        } else {
          state.constructorIngredients.push({ ...action.payload, id: uuid(), count: 1 });
        }
      }
    },
    ingredientSort(state, action) {
      state.constructorIngredients.splice(
        action.payload.to,
        0,
        state.constructorIngredients.splice(action.payload.from, 1)[0]
      );
    },
  },
});

export const { addIngredient, removeIngredient, addConstructorIngredient, ingredientSort } = burgerConstructorSlice.actions;
export const selectConstructorIngredients = state => state.burgerConstructor.constructorIngredients;
export const selectTotalPrice = state => state.burgerConstructor.totalPrice;
export default burgerConstructorSlice.reducer;
