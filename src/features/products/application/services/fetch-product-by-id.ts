import { useGetProductByIdQuery } from "../../infrastructure/redux/api-service";

export const fetchProductById = (id: string) => {
  const {
    data,
    ...rest
  } = useGetProductByIdQuery(id);

  const product = data ?? null;
  return { product, ...rest };
}