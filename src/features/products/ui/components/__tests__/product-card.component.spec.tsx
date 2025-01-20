import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { ProductCard } from '../product-card.component';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('ProductCard', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    imageUrl: 'http://example.com/image.jpg',
    stock: 10,
  };

  test('should render the component correctly', () => {
    render(<ProductCard {...product} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/En Stock/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
  });

  test('should show "Out of Stock" when there is no stock', () => {
    const outOfStockProduct = { ...product, stock: 0 };
    
    render(<ProductCard {...outOfStockProduct} />);

    expect(screen.getByText(/Fuera de stock/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fuera de stock/i })).toBeDisabled();
  });

  test('the button should navigate to the product page when clicked', () => {
    render(<ProductCard {...product} />);

    const button = screen.getByRole('button', { name: /Ver/i });
    
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith(`/products/${product.id}`);
  });

  test('the button should be disabled if there is no stock', () => {
    const outOfStockProduct = { ...product, stock: 0 };
    
    render(<ProductCard {...outOfStockProduct} />);
    
    const button = screen.getByRole('button', { name: /Fuera de stock/i });
    
    expect(button).toBeDisabled();
  });
});
