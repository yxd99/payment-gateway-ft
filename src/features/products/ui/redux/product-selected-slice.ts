import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductSelected {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const initialState: ProductSelected = {
  id: '',
  name: '',
  price: 0,
  imageUrl: '',
};

const productSelectedSlice = createSlice({
  name: 'productSelected',
  initialState,
  reducers: {
    setProductSelected: (_state, action: PayloadAction<ProductSelected>) => {
      return action.payload;
    },
    clearProductSelected: () => initialState,
  },
});

export const { setProductSelected, clearProductSelected } = productSelectedSlice.actions;

export default productSelectedSlice.reducer;
