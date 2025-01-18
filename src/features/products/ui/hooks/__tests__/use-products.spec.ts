import { Product } from "@features/products/core/product";
import { ProductHttpRepository } from "@features/products/infrastructure/product-http-repository";
import { renderHook } from "@testing-library/react";
import { useProducts } from "../use-products";

jest.mock('@/config/envs');
jest.mock("@features/products/infrastructure/product-http-repository");

describe("useProducts hook", () => {
  it("fetches products and returns them", async () => {
    const mockProducts: Product[] = [
      {
        id: "123",
        name: "Test Product 1",
        price: 99.99,
        imageUrl: "http://example.com/product1.jpg",
        stock: 10
      },
      {
        id: "124",
        name: "Test Product 2",
        price: 199.99,
        imageUrl: "http://example.com/product2.jpg",
        stock: 20
      }
    ];

    (ProductHttpRepository.prototype.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result, rerender } = renderHook(() => useProducts({ size: 2, page: 1 }));

    expect(result.current.loading).toBe(true);

    await rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("handles error while fetching products", async () => {
    (ProductHttpRepository.prototype.getProducts as jest.Mock).mockRejectedValue(new Error("Failed to fetch products"));

    const { result, rerender } = renderHook(() => useProducts({ size: 2, page: 1 }));

    expect(result.current.loading).toBe(true);

    await rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toBeNull();
    expect(result.current.error).toBe("Failed to fetch products");
  });
});
