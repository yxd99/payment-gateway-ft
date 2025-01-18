import productSelectedReducer, { setProductSelected, clearProductSelected, ProductSelected } from '../product-selected-slice';

describe('productSelectedSlice', () => {
  const initialState: ProductSelected = {
    id: '',
    name: '',
    price: 0,
    imageUrl: '',
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
    };

    let result = productSelectedReducer(initialState, setProductSelected(mockProduct));
    
    result = productSelectedReducer(result, clearProductSelected());
    
    expect(result).toEqual(initialState);
  });
});
