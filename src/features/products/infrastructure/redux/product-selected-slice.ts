import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSelected } from '../../application/ports/product-selected-slice';

const initialState: ProductSelected = {
  id: '',
  name: '',
  price: 0,
  imageUrl: '',
  quantity: 0,
  stock: 0,
};

const productSelectedSlice = createSlice({
  name: 'productSelected',
  initialState,
  reducers: {
    setProductSelected: (_state, action: PayloadAction<ProductSelected>) => {
      return action.payload;
    },
    clearProductSelected: () => initialState,
    setProductQuantity: (state, action: PayloadAction<number>) => {
      if (action.payload < 1 || action.payload > state.stock) {
        return;
      }
      state.quantity = action.payload;
    },
  },
});

export const { setProductSelected, clearProductSelected, setProductQuantity } =
  productSelectedSlice.actions;

export default productSelectedSlice.reducer;
