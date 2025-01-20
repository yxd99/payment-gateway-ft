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
    let totalProducts: Product[] = [];

    if (productsQuery.length > 0) {
      totalProducts = [...products, ...productsQuery];
      setHasMore(true);
    } else {
      totalProducts = [...products];
      setHasMore(false);
    }

    setProducts([...new Set(totalProducts)]);
  }, [isFetching, products, productsQuery]);

  return {
    hasMore,
    products,
    isFetching,
    ...rest,
  };
};
