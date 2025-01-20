import { useEffect, useState } from 'react';
import { Product } from '@features/products/core/product';
import { getProducts } from '@features/products/application/use-cases/get-products';
import { Pagination } from '@features/products/application/ports/pagination';

export const useProducts = (pagination: Pagination) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const {
    products: productsQuery,
    isFetching,
    ...rest
  } = getProducts(pagination);

  useEffect(() => {
    if (productsQuery.length > 0) {
      const updatedProducts = Array.from(new Set([...products, ...productsQuery].map(a => a.id)))
        .map(id => [...products, ...productsQuery].find(a => a.id === id))
        .filter((product): product is Product => product !== undefined);

      setProducts(updatedProducts);
    }
  }, [productsQuery]);

  useEffect(() => {
    setHasMore(products.length === pagination.size * pagination.page);
  }, [products, pagination.size, pagination.page]);

  return {
    hasMore,
    products,
    isFetching,
    ...rest,
  };
};
