import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',         // Заголовок модального окна
  isOpen: false,     // Открыто модальное окно или нет
  content: null,     // Содержимое модального окна
  activeModal: null, // Для отслеживания активного модального окна
};

const sliceName = 'modal';

export const modalSlice = createSlice({
  name: sliceName ,
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.activeModal = action.payload.active;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = '';
      state.content = null;
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = state => state.modal;

export const selectActiveModal = state => state.modal.activeModal;

export default modalSlice.reducer;
