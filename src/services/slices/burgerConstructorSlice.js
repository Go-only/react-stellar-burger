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
            // Находим индекс ингредиента, который нужно удалить
            const index = state.constructorIngredients.findIndex(ingredient => ingredient.id === action.payload.id);
    
            if (index !== -1) {
              state.constructorIngredients.splice(index, 1);
            }
    },
    addConstructorIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun');
        state.bun = action.payload;
      } else {
          state.constructorIngredients.push({ ...action.payload, id: uuid() });
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
export const selectBun = state => state.burgerConstructor.bun;
export default burgerConstructorSlice.reducer;
