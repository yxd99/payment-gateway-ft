import { useEffect, useState } from "react";
import { Product } from "../../core/product";
import { GetProducts } from "../../application/use-cases/get-products";
import { ProductHttpRepository } from "../../infrastructure/product-http-repository";

export const useProducts = (size: number, page: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const repository = new ProductHttpRepository();
        const useCase = new GetProducts(repository);
        const data = await useCase.execute(size, page);
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