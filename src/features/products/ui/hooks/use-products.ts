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
    } else {
      totalProducts = [...products];
    }
    const uniqueProducts = [...new Set(totalProducts)];
    setProducts(uniqueProducts);
  }, [isFetching, products, productsQuery]);

  useEffect(() => {
    setHasMore(products.length === pagination.size * pagination.page);
  }, [products]);

  return {
    hasMore,
    products,
    isFetching,
    ...rest,
  };
};
