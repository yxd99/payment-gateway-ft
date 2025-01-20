import { ProductSelected } from '@features/products/application/ports/product-selected-slice';
import productSelectedReducer, { setProductSelected, clearProductSelected } from '@features/products/infrastructure/redux/product-selected-slice';

describe('productSelectedSlice', () => {
  const initialState: ProductSelected = {
    id: '',
    name: '',
    price: 0,
    imageUrl: '',
    stock: 0,
    quantity: 0,
  };

  test('debe retornar el estado inicial', () => {
    const result = productSelectedReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('debe establecer el producto seleccionado', () => {
    const mockProduct: ProductSelected = {
      id: '1',
      name: 'Producto de Prueba',
      price: 100,
      imageUrl: 'http://example.com/image.jpg',
      stock: 10,
      quantity: 1,
    };

    const result = productSelectedReducer(initialState, setProductSelected(mockProduct));
    expect(result).toEqual(mockProduct);
  });

  test('debe limpiar el producto seleccionado', () => {
    const mockProduct: ProductSelected = {
      id: '1',
      name: 'Producto de Prueba',
      price: 100,
      imageUrl: 'http://example.com/image.jpg',
      stock: 10,
      quantity: 1,
    };

    let result = productSelectedReducer(initialState, setProductSelected(mockProduct));
    
    result = productSelectedReducer(result, clearProductSelected());
    
    expect(result).toEqual(initialState);
  });
});
