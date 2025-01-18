import { renderHook } from '@testing-library/react';
import { GetProductById } from '@features/products/application/use-cases/get-product-by-id';
import { useProductById } from '../use-product-by-id';

jest.mock('@/config/envs');
jest.mock('@features/products/infrastructure/product-http-repository');
jest.mock('@features/products/application/use-cases/get-product-by-id');

describe('useProductById', () => {
  const mockExecute = jest.fn();
  const mockProduct = { id: '1', name: 'Test Product' };

  beforeEach(() => {
    (GetProductById as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load a product successfully', async () => {
    mockExecute.mockResolvedValueOnce(mockProduct);

    const { result, rerender } = renderHook(() => useProductById('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBeNull();

    await rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when loading a product', async () => {
    const errorMessage = 'Failed to fetch product';
    mockExecute.mockRejectedValueOnce(new Error(errorMessage));

    const { result, rerender } = renderHook(() => useProductById('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBeNull();

    await rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toEqual(errorMessage);
  });
});
