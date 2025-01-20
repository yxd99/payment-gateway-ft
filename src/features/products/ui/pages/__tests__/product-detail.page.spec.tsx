import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router';
import ProductDetailPage from '@features/products/ui/pages/product-detail.page';
import { getProductById } from '@features/products/application/use-cases/get-product-by-id';

jest.mock('@features/products/ui/hooks/use-product-by-id');

describe('ProductDetailPage', () => {
  const mockUseProductById = getProductById as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostrar "Loading..." mientras se carga el producto', () => {
    mockUseProductById.mockReturnValue({
      product: null,
      loading: true,
      error: null,
    });

    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('debe mostrar un mensaje de error si hay un error al cargar el producto', () => {
    mockUseProductById.mockReturnValue({
      product: null,
      loading: false,
      error: 'Error al cargar el producto',
    });

    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );

    expect(
      screen.getByText(/error al cargar el producto/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar "Product not found" si no hay producto', () => {
    mockUseProductById.mockReturnValue({
      product: null,
      loading: false,
      error: null,
    });

    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );

    expect(screen.getByText(/product not found/i)).toBeInTheDocument();
  });

  test('debe mostrar el componente ProductDetail cuando se carga un producto correctamente', () => {
    const mockProduct = {
      id: '1',
      name: 'Producto de Prueba',
      price: 100,
      imageUrl: 'http://example.com/image.jpg',
    };

    mockUseProductById.mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
    });

    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );

    expect(screen.getByText(/producto de prueba/i)).toBeInTheDocument();
  });
});
