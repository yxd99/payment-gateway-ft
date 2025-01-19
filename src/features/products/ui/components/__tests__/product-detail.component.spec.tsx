import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@store/index';
import { setProductSelected } from '@/features/products/infrastructure/redux/product-selected-slice';
import { ProductDetail } from '../product-detail.component';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@store/index', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@features/products/ui/redux/product-selected-slice', () => ({
  setProductSelected: jest.fn(),
}));

describe('ProductDetail', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
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
    render(<ProductDetail {...product} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
  });

  test('should dispatch the action and navigate to checkout when clicking "Buy"', () => {
    render(<ProductDetail {...product} />);

    const button = screen.getByRole('button', { name: /Buy/i });
    
    fireEvent.click(button);
    
    expect(mockDispatch).toHaveBeenCalledWith(setProductSelected({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
      quantity: 1,
    }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});
