import { useEffect, useState } from "react";
import { Product } from "@features/products/core/product";
import { GetProducts } from "@features/products/application/use-cases/get-products";
import { ProductHttpRepository } from "@features/products/infrastructure/product-http-repository";
import { Pagination } from "@features/products/application/ports/pagination";

export const useProducts = ({ size, page }: Pagination) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const repository = new ProductHttpRepository();
        const useCase = new GetProducts(repository);
        const data = await useCase.execute({ size, page });
        setProducts(data);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [size, page]);

  return { products, loading, error };
};