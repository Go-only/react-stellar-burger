import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  isOpen: false,
  content: null,
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
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = '';
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = state => state.modal;

export default modalSlice.reducer;
