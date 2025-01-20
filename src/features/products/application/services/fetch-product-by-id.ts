/* eslint-disable react-hooks/rules-of-hooks */
import { useGetProductByIdQuery } from "@features/products/infrastructure/redux/api-service";

export const fetchProductById = (id: string) => {
  const {
    data,
    ...rest
  } = useGetProductByIdQuery(id);

  const product = data ?? null;
  return { product, ...rest };
}