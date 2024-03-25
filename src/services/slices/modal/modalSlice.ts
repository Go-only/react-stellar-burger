import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface IModalState {
  title: string;
  isOpen: boolean;
  content: string | null;
  activeModal: string | null;
}

export const initialState: IModalState = {
  title: "", // Заголовок модального окна
  isOpen: false, // Открыто модальное окно или нет
  content: null, // Содержимое модального окна
  activeModal: null, // Для отслеживания активного модального окна
};

const sliceName = "modal";

export const modalSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        title: string;
        content: string | null;
        active: string | null;
        isOpen: boolean;
      }>
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.activeModal = action.payload.active;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = null;
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal;

export const selectActiveModal = (state: RootState) => state.modal.activeModal;

export default modalSlice.reducer;
