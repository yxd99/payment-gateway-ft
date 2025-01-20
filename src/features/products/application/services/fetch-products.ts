/* eslint-disable react-hooks/rules-of-hooks */
import { useGetProductsQuery } from "../../infrastructure/redux/api-service";
import { Pagination } from "../ports/pagination";

export const fetchProducts = (pagination: Pagination) => {
  const {
    data,
    ...rest
  } = useGetProductsQuery(pagination);

  const products = data ?? [];
  return { products, ...rest };
}