import { useEffect, useState } from "react";
import { Product } from "../../core/product";
import { Pagination } from "../ports/pagination";
import { fetchProducts } from "../services/fetch-products";

export const getProducts = (pagination: Pagination) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { products: productsQuery, isFetching, ...rest } = fetchProducts(pagination);

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
  }, [isFetching]);

  return {
    hasMore,
    products,
    isFetching,
    ...rest,
  };
}