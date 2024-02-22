import { createSlice } from '@reduxjs/toolkit';

const sliceName = 'burgerConstructor';
const initialState = {
  constructorIngredients: [], // список всех ингредиентов в текущем конструкторе бургера
  bun: null, // тип ингредиента bun
  draggedIngredientId: null, // id ингредиента, который сейчас перемещается
};

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setIngredients: (state, action) => {  // Устанавливает список ингредиентов
      state.ingredients = action.payload;
    },
    setBun: (state, action) => {  // Устанавливает булку
      state.bun = action.payload;
    },
    setDraggedIngredientId: (state, action) => {  // Устанавливает id перетаскиваемого ингредиента
      state.draggedIngredientId = action.payload;
    },
    addIngredient: (state, action) => {  // Добавляет ингредиент в список конструктора
      state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {  // Удаляет ингредиент из списка конструктора
      state.constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.id !== action.payload.id);
    },
    addConstructorIngredient: (state, action) => { // Добавления ингредиента в конструктор
      state.constructorIngredients.push(action.payload);
    },
  },
});

export const { setIngredients, setBun, setDraggedIngredientId, addIngredient, removeIngredient, addConstructorIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
