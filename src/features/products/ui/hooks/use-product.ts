import { useEffect, useState } from "react";
import { Product } from "../../core/product";
import { ProductHttpRepository } from "../../infrastructure/product-http-repository";
import { GetProductById } from "../../application/use-cases/get-product-by-id";

export const useProductById = (id: string) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const repository = new ProductHttpRepository();
        const useCase = new GetProductById(repository);
        const data = await useCase.execute(id);
        setProduct(data);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return { product, loading, error };
};