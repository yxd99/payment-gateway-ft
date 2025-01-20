/* eslint-disable react-hooks/rules-of-hooks */
import { useGetProductsQuery } from "@features/products/infrastructure/redux/api-service";
import { Pagination } from "@features/products/application/ports/pagination";

export const fetchProducts = (pagination: Pagination) => {
  const {
    data,
    ...rest
  } = useGetProductsQuery(pagination);

  const products = data ?? [];
  return { products, ...rest };
}