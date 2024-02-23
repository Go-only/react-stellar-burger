import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';


const sliceName = 'burgerConstructor';
const initialState = {
  bun: null,                  // булка
  constructorIngredients: [], // список всех ингредиентов в текущем конструкторе бургера, кроме булок
  totalPrice: 0,              // Общая стоимость
};

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    removeIngredient: (state, action) => {
      // Находим индекс ингредиента, который нужно удалить
      const index = state.constructorIngredients.findIndex(ingredient => ingredient.id === action.payload.id);
    
      if (index !== -1) {
        // Вычисляем стоимость удаляемого ингредиента
        const removedIngredientPrice = state.constructorIngredients[index].price;
    
        // Удаляем ингредиент из массива
        state.constructorIngredients.splice(index, 1);
    
        // Вычитаем стоимость удаляемого ингредиента из общей цены
        state.totalPrice -= removedIngredientPrice;
      }
    },
    addConstructorIngredient: (state, action) => { // Добавление ингредиента в конструктор
      if (action.payload.type === 'bun') {         //Добавление булок
        // Удалить предыдущие булки, если они есть
        state.constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun');

        // Добавить новые булки
        state.totalPrice = action.payload.price * 2; // Перезаписываем цену, так как это новые булки
        state.bun = action.payload;
      } else {
        //Добавление остальных ингредиентов
        state.totalPrice = state.totalPrice + action.payload.price;
        state.constructorIngredients.push({...action.payload, id: uuid()});
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
export const selectTotalPrice = state => state.burgerConstructor.totalPrice;
export default burgerConstructorSlice.reducer;
