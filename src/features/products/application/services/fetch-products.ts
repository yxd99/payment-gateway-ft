import { useGetProductsQuery } from "../../infrastructure/redux/api-service";

export const fetchProducts = (params: any) => {
  const {
    data,
    ...rest
  } = useGetProductsQuery(params);

  const products = data ?? [];
  return { products, ...rest };
}